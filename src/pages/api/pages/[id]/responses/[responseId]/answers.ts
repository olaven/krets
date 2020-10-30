import { CREATED } from "node-kall";
import { NextApiRequest, NextApiResponse } from "next";
import { asPageOwner, withAuthentication, withErrorHandling, withMethodHandlers } from "../../../../../../middleware/middleware";
import { withCors } from "../../../../../../middleware/withCors";
import { database } from "../../../../../../database/database";
import { AnswerModel } from "../../../../../../models/models";
import { getPathParam } from "../../../../../../workarounds";


export const getAnswers = withAuthentication(
    asPageOwner(
        url => getPathParam(url, 4),
        async (request: NextApiRequest, response: NextApiResponse) => {

            const responseId = getPathParam(request.url, 2);
            const retrieved = await database.answers.getByResponse(responseId);

            return response
                .json(retrieved)
        }
    )
);

export const postAnswers = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseId = getPathParam(request.url, 2);
    const persistedResponse = await database.responses.get(responseId);

    const answer = request.body as AnswerModel;
    answer.response_id = persistedResponse.id;

    const persisted = await database.answers.createAnswer(answer)
    return response
        .status(CREATED)
        .send(persisted);
}


export default withCors(
    withErrorHandling(
        withMethodHandlers({
            GET: getAnswers,
            POST: postAnswers
        }),
    )
);