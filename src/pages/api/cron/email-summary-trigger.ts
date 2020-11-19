import { FORBIDDEN, ACCEPTED } from "node-kall";
import { asyncForEach } from "../../../helpers/asyncForEach";
import { database } from "../../../database/database";
import { date } from "../../../helpers/date";
import { defaultQuestion } from "../../../helpers/defaultQuestion";
import { emojidata } from "../../../helpers/emojidata";
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
        total_response_count_in_period: number,
        positive: boolean,
        percentage: number,
        responses: TemplateResponse[]
    }[],
};



const getTemplateQuestions = async (response: ResponseModel): Promise<TemplateQuestion[]> => {

    const answers = await database.answers.getByResponse(response.id);
    const questions = await database.questions.getByPage(response.page_id);


    return !questions.length ?
        [{ text: defaultQuestion(response.emotion).text, answer_text: answers[0]?.text }] :
        questions.map(question => ({
            text: question.text,
            answer_text: answers.find(answer => answer.question_id === question.id).text
        }))
}

const getPages = (user: UserModel) => database.pages.getByOwner(user.id);

const getTemplateResponses = async (page: PageModel): Promise<TemplateResponse[]> => {

    const responses = await lastSevenDays(page);
    return await Promise.all(
        responses.map(async response => ({
            emoji: emojidata[response.emotion],
            contact_details: response.contact_details,
            questions: await getTemplateQuestions(response)
        })));
}

//NOTE: Exported to tests
export const toTemplate = async (pages: PageModel[]): Promise<PostMarkSummaryTemplate> => {

    const templatePages = await Promise.all(
        pages.map(async page => ({
            name: page.name,
            total_response_count_in_period: pages.length,
            positive: true, // TODO: calculate 
            percentage: 1, //TODO: calculate 
            responses: await getTemplateResponses(page)
        })));

    return {
        pages: templatePages,
    }
}

const send = async (template: PostMarkSummaryTemplate) => {

    const client = new ServerClient(
        process.env.POSTMARK_OUTBOUND_KEY
    );

    await client.sendEmailWithTemplate({
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