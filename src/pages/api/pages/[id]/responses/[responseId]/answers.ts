import { FORBIDDEN, CREATED, OK } from "node-kall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { asPageOwner, withAuthentication, withErrorHandling, withMethodHandlers } from "../../../../../../middleware/middleware";
import { withCors } from "../../../../../../middleware/withCors";
import { answers, pages, responses } from "../../../../../../database/database";
import auth0 from "../../../../../../auth/auth0";
import { AnswerModel } from "../../../../../../models/models";
import { getPathParam } from "../../../../../../workarounds";




export const getAnswers = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseId = getPathParam(request.url, 2);
    const retrieved = await answers.getByResponse(responseId);

    return response
        .json(retrieved)
}

export const postAnswers = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseId = getPathParam(request.url, 2);
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
            asPageOwner(
                url => getPathParam(url, 4),
                withMethodHandlers({
                    GET: getAnswers,
                    POST: postAnswers
                }),
            )
        )
    )
);