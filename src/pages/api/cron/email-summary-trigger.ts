import { FORBIDDEN, ACCEPTED } from "node-kall";
import { asyncForEach } from "../../../helpers/asyncForEach";
import { database } from "../../../database/database";
import { date } from "../../../helpers/date";
import { defaultQuestion } from "../../../helpers/defaultQuestion";
import { emojidata, numericEmojiToString } from "../../../helpers/emojidata";
import { withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { PageModel, ResponseModel, UserModel, } from "../../../models/models";
import { ServerClient } from "postmark";

//FIXME: clean this file 

const lastSevenDays = (page: PageModel) =>
    database.responses.getAfter(
        page.id,
        date().last(7).days()
    );

type TemplateQuestion = {
    text: string,
    answer_text: string,
}

type TemplateResponse = {

    emoji: string,
    contact_details?: string
    questions: TemplateQuestion[],
}


type PostMarkSummaryTemplate = {
    pages: {

        name: string,
        id: string,
        total_response_count_in_period: number,
        positive: boolean,
        percentage: number,
        development_not_calculated: boolean,
        responses: TemplateResponse[]
    }[],
};



const getTemplateQuestions = async (response: ResponseModel): Promise<TemplateQuestion[]> => {

    const answers = await database.answers.getByResponse(response.id);
    const questions = await database.questions.getByPage(response.page_id);

    return answers
        .filter(answer => answer.text)
        .map(answer => {

            //if the answer does not have a user-defined question, it is a default question
            const question = questions.find(question => question.id === answer.question_id);
            const actual = question ? question : defaultQuestion(
                numericEmojiToString(
                    response.emotion
                )
            );

            return {
                text: actual.text,
                answer_text: answer.text
            }
        })
}

const getPages = (user: UserModel) => database.pages.getByOwner(user.id);

const getTemplateResponses = async (page: PageModel): Promise<TemplateResponse[]> => {

    const responses = await lastSevenDays(page);
    return (await Promise.all(
        responses.map(async response => {

            const emoji = emojidata[
                numericEmojiToString(response.emotion)
            ]

            return ({
                emoji,
                contact_details: response.contact_details,
                questions: await getTemplateQuestions(response)
            })
        })));
}

export const filterOutIfNoQuestions = (responses: TemplateResponse[]) =>
    responses
        .filter(r => r.questions.length > 0);

//NOTE: Exported to tests
export const calculateDevelopment = async (page: PageModel): Promise<{ percentage: number, positive: boolean, developmentNotCalculated: boolean }> => {

    const lastWeek = await database.responses.averageBetween(
        date().last(7).days(),
        date().now(),
        page.id
    );

    const weekBefore = await database.responses.averageBetween(
        date().last(14).days(),
        date().last(7).days(),
        page.id
    );

    if (isNaN(weekBefore)) {
        return { positive: true, percentage: 100, developmentNotCalculated: true }
    }

    const percentage = 100 * Math.abs((lastWeek - weekBefore) / ((lastWeek + weekBefore) / 2))
    const positive = lastWeek >= weekBefore;

    return { percentage, positive, developmentNotCalculated: false };
}

//NOTE: Exported to tests
export const toTemplate = async (pages: PageModel[]): Promise<PostMarkSummaryTemplate> => {

    const templatePages = await Promise.all(
        pages.map(async page => {

            const { percentage, positive, developmentNotCalculated } = await calculateDevelopment(page);

            const responses = filterOutIfNoQuestions(
                await getTemplateResponses(page)
            );

            return {
                name: page.name,
                id: page.id,
                total_response_count_in_period: responses.length,
                positive: positive,
                percentage: percentage,
                development_not_calculated: developmentNotCalculated,
                responses
            }
        }));

    return {
        pages: templatePages,
    }
}

const send = async (
    user: UserModel,
    template: PostMarkSummaryTemplate
) => {

    const client = new ServerClient(
        process.env.POSTMARK_OUTBOUND_KEY
    );

    if (!user.contact_email) {

        console.info(`DEBUG: skipping ${user.id} as contact_email was ${user.contact_email}`);
        return;
    }

    await client.sendEmailWithTemplate({
        To: user.contact_email,
        From: "post@krets.app",
        ReplyTo: "post@krets.app",
        MessageStream: "outbound",
        TemplateAlias: "krets-summary",
        TemplateModel: template
    });
}

const triggerEmailSummary = async () => {

    const users = await database.users.getSummaryUsers()
    //NOTE: Should NOT await for every user? (only inner)
    await asyncForEach(users, async user => {
        await send(
            user,
            await toTemplate(
                await getPages(
                    user
                )
            )
        )
    })
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