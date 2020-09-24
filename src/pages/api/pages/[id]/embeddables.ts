import { nanoid } from "nanoid"
import { NextApiRequest, NextApiResponse } from "next";
import { BAD_REQUEST, CREATED, NOT_FOUND, NOT_IMPLEMENTED, NO_CONTENT } from "node-kall";
import { embeddables, responses, answers as answerDB, pages } from "../../../../database/database";
import { withErrorHandling, withAuthentication, withMethodHandlers, asPageOwner } from "../../../../middleware/middleware"
import { withCustomOriginCors } from "../../../../middleware/withCors";
import { EmbeddableModel, EmbeddableResponseModel } from "../../../../models/models";
import { getPathParam } from "../../../../workarounds";

const getPageId = url => getPathParam(url, 2);

const postEmbeddable = withAuthentication(
    asPageOwner(
        getPageId,
        async (request, response) => {

            const embeddable = request.body as EmbeddableModel;
            if (!embeddable.origin)
                return response
                    .status(BAD_REQUEST)
                    .end();


            const page = await pages.getPage(
                getPageId(request.url)
            );

            const persisted = await embeddables.createEmbeddable({
                ...embeddable,
                page_id: page.id,
                token: nanoid(),
            });

            response
                .status(CREATED)
                .send(persisted);
        }
    )
);

const embeddableResponseHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { token, response, answers } = req.body as EmbeddableResponseModel;
    const embeddable = await embeddables.getByToken(token)

    if (!embeddable) return res
        .status(NOT_FOUND)
        .end();

    withCustomOriginCors(embeddable.origin)(
        async (request, res) => {

            const page = await pages.getPage(
                getPageId(request.url)
            );

            //if (embeddable.page_id !== page.id && response.page_id !== page.id)
            if (embeddable.page_id !== page.id || response.page_id !== page.id)
                return res
                    .status(BAD_REQUEST)
                    .end()

            //Need to persist response in order to get its ID 
            const persistedResponse = await responses.createResponse(response);
            await answerDB.createAnswers(
                answers.map(answer => ({
                    ...answer,
                    response_id: persistedResponse.id
                }))
            );

            res
                .status(CREATED)
                .end();
        }
    )(req, res);
}

export default withErrorHandling(

    withMethodHandlers({
        POST: postEmbeddable,
        /**
         * `PUT` is not ideal.
         * This endpoint: verifies token and origin combo + posts `response` (not embeddable)
         */
        PUT: embeddableResponseHandler
    })

);