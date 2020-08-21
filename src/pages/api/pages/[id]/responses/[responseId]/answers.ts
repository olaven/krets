import { FORBIDDEN, CREATED, OK } from "node-kall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withAuthentication, withErrorHandling, withMethodHandlers } from "../../../../../../middleware/middleware";
import { withCors } from "../../../../../../middleware/withCors";
import { answers, pages, responses } from "../../../../../../database/database";
import auth0 from "../../../../../../auth/auth0";
import { AnswerModel } from "../../../../../../models/models";

//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string, index: number) => {

    const split = url.split("/");
    return split[split.length - index];
};

//THINKABOUT: how to better solve the amount of dabase reads in this function 
//THINKABOUT: generalize and share this middlware somehow? 
const actuallyOwns = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const pageId = getId(request.url, 4);
        const { user } = await auth0.getSession(request);

        const page = await pages.getPage(pageId);

        return (page.owner_id !== user.sub) ?
            response
                .status(FORBIDDEN)
                .end() :
            handler(request, response);
    }


export const getAnswers = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseId = getId(request.url, 2);
    const retrieved = await answers.getByResponse(responseId);

    return response
        .json(retrieved)
}

export const postAnswers = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseId = getId(request.url, 2);
    const persistedResponse = await responses.getResponse(responseId);

    const answer = request.body as AnswerModel;
    answer.response_id = persistedResponse.id;

    const persisted = await answers.createAnswer(answer)
    return response
        .status(CREATED)
        .send(persisted);
}


export default withCors(
    withAuthentication(
        withErrorHandling(
            actuallyOwns(
                withMethodHandlers({
                    GET: getAnswers,
                    POST: postAnswers
                })
            )
        )
    )
);