import { FORBIDDEN, ACCEPTED } from "node-kall";
import { asyncForEach } from "../../../asyncForEach";
import { database } from "../../../database/database";
import { date } from "../../../date";
import { emojidata } from "../../../emojidata";
import { withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { PageModel, ResponseModel, UserModel, } from "../../../models/models";

const lastSevenDays = (page: PageModel) =>
    database.responses.getAfter(
        page.id,
        date().last(7).days()
    )


//FIXME: FUGLY
const getSummaryData = async () => {

    const users = await database.users.getActive();
    //NOTE: Should NOT await for every user? (only inner)
    await asyncForEach(users, async user => {

        const pages = await database.pages.getByOwner(user.id);
        await asyncForEach(pages, async page => {

            const responses = await lastSevenDays(page);
            await asyncForEach(responses, async response => {

                const answers = await database.answers.getByResponse(response.id);

            });
        });
    });
}

type PostMarkSummaryTemplate = {
    pages: {

        name: string,
        total_response_count_in_period: number,
        positive: boolean,
        percentage: number,

        responses: {

            emoji: string,
            contact_details: string
            questions: {
                text: string,
                answer_text: string,
            }[],
        },
    }[],
};


const getTemplateQuestions = (response: ResponseModel) => {

    //TOOD: IMPlement
}


const getTemplateResponses = (page: PageModel) => {

    const responses = await lastSevenDays(page);
    return responses.map(response => ({
        emoji: emojidata[response.emotion],
        contact_details: response.contact_details,
        questions: getTemplateQuestions(response)
    }));
}

const toTemplate = (pages: PageModel[]): PostMarkSummaryTemplate => {

    const templatePages = pages.map(page => ({
        name: page.name,
        total_response_count_in_period: pages.length,
        positive: true, // TODO: calculate 
        percentage: 1, //TODO: calculate 
        responses: getTemplateResponse(page)
    }));

    return {
        pages: [
            {
                name: "some name",

            }
        ]
    }
}

const triggerEmailSummary = async () => {

    const users = await database.users.getActive();
    //NOTE: Should NOT await for every user? (only inner)
    await asyncForEach(users, async user => {
        send(
            toTemplate(
                await getSummaryData(user)
            )
        )
    }
}

export default withErrorHandling(
    withMethodHandlers({
        GET: async (request, response) => {

            const expected = process.env.EMAIL_SUMMARY_SECRET;
            const actual = request.headers["x-krets-email-summary-secret"];

            if (actual !== expected) {
                return response.status(FORBIDDEN).end();
            }

            triggerEmailSummary();

            return response.status(ACCEPTED).end();
        }
    })
)