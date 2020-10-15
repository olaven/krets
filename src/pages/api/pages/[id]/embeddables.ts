import { nanoid } from "nanoid"
import { NextApiRequest, NextApiResponse } from "next";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "node-kall";
import { database } from "../../../../database/database";
import { withErrorHandling, withAuthentication, withMethodHandlers, asPageOwner } from "../../../../middleware/middleware"
import { withCors } from "../../../../middleware/withCors";
import { EmbeddableModel, EmbeddableResponseModel } from "../../../../models/models";
import { getPathParam } from "../../../../workarounds";

const getPageId = url => getPathParam(url, 2);

const getEmbeddable = withCors(
    withAuthentication(
        asPageOwner(
            getPageId,
            async (request, response) => {


                const embeddable = await database.embeddables.getByPage(
                    getPageId(request.url)
                );

                embeddable ?
                    response
                        .json(embeddable) :
                    response
                        .status(NOT_FOUND)
                        .end();
            }
        )
    )
);

const postEmbeddable = withCors(
    withAuthentication(
        asPageOwner(
            getPageId,
            async (request, response) => {

                const embeddable = request.body as EmbeddableModel;
                if (!embeddable.page_id) //THINKABOUT: unessecary to send body at all - all data is generated server side (also page-id)
                    return response
                        .status(BAD_REQUEST)
                        .end()

                const page = await database.pages.getPage(
                    getPageId(request.url)
                );

                const persisted = await database.embeddables.createEmbeddable({
                    ...embeddable,
                    page_id: page.id,
                    token: nanoid(),
                });

                response
                    .status(CREATED)
                    .send(persisted);
            }
        )
    )
);

const embeddableResponseHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { token, response, answers } = req.body as EmbeddableResponseModel;
    const embeddable = await database.embeddables.getByToken(token)

    if (!embeddable) return res
        .status(NOT_FOUND)
        .end();

    const page = await database.pages.getPage(
        getPageId(req.url)
    );

    //if (embeddable.page_id !== page.id && response.page_id !== page.id)
    if (embeddable.page_id !== page.id || response.page_id !== page.id)
        return res
            .status(BAD_REQUEST)
            .end()

    //Need to persist response in order to get its ID 
    const persistedResponse = await database.responses.createResponse(response);
    await database.answers.createAnswers(
        answers.map(answer => ({
            ...answer,
            response_id: persistedResponse.id
        }))
    );

    res
        .status(CREATED)
        .end();

}

export default withErrorHandling(

    withMethodHandlers({
        GET: getEmbeddable,
        POST: postEmbeddable,
        /**
         * `PUT` is not ideal.
         * This endpoint: verifies token and origin combo + posts `response` (not embeddable)
         */
        PUT: embeddableResponseHandler
    })

);