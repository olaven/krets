import { NextApiRequest, NextApiResponse } from "next";
import { BAD_REQUEST, NO_CONTENT, FORBIDDEN, OK } from "node-kall";
import auth0 from "../../../../../auth/auth0";
import { questions } from "../../../../../database/database";
import { pages } from "../../../../../database/pages";
import { withErrorHandling, withAuthentication, withMethodHandlers } from "../../../../../middleware/middleware";
import { QuestionModel } from "../../../../../models/models";

//TODO: share this generic workaround between all files and use it like this: getPageId = (url: string) => getId(url, 2); 
//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
export const getId = (url: string, splitAt: number) => {

    const split = url.split("/");
    return split[split.length - splitAt];
};

const getPageId = (url: string) => getId(url, 3);
const getQuestionId = (url: string) => getId(url, 1);


/**
 * Verifies that the user actually ows the given question and 
 * passes it down in callback if so. 
 * @param questionHandler handler code 
 * 
 * e.g. withQuestion((question, response) => { <Do thing here> })
 */
const withQuestion = (questionHandler: (question: QuestionModel, response: NextApiResponse) => Promise<void> | void) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const question = request.body as QuestionModel;
        const givenQuestionId = getQuestionId(request.url);
        const givenPageId = getPageId(request.url);

        if (question.id.toString() !== givenQuestionId || question.page_id !== givenPageId)
            return response
                .status(BAD_REQUEST) //THINKABOUT FORBIDDEN or CONFLCIT more appropriate? 
                .end();

        const { user } = await auth0.getSession(request);
        const page = await pages.getPage(givenPageId);
        if (page?.owner_id !== user.sub)
            return response
                .status(FORBIDDEN)
                .end();

        questionHandler(question, response);
    }


const putQuestion = withQuestion(async (question, response) => {

    await questions.updateQuestion(question);

    response
        .status(NO_CONTENT)
        .end()
});

//THINKABOUT: should probably not have to pass question has body. 
const deleteQuestion = withQuestion(async (question, response) => {

    const deleted = await questions.deleteQuestion(question.id);
    response
        .status(OK)
        .send(deleted)
});

export default withErrorHandling(
    withMethodHandlers({ //NOTE: wrapping authentication twice, as 405 should be prioritized over 401
        PUT: withAuthentication(putQuestion),
        DELETE: withAuthentication(deleteQuestion),
    })
);