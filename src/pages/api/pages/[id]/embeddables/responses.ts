
import { NextApiHandler } from "next";
import { NOT_FOUND, BAD_REQUEST, CREATED } from "node-kall";
import { database } from "../../../../../database/database";
import { EmbeddableResponseModel } from "../../../../../models/models";
import { withErrorHandling, withMethodHandlers, withCors } from "../../../../../middleware/middleware"
import { getPathParam } from "../../../../../helpers/workarounds";

const getPageId = url => getPathParam(url, 3);

const applyMiddleware = (handler: NextApiHandler) =>
    withCors(
        withErrorHandling(
            withMethodHandlers({
                POST: handler
            })
        ),
        "*"
    )

export default applyMiddleware(

    async (req, res) => {

        const { token, response, answers } = req.body as EmbeddableResponseModel;
        const embeddable = await database.embeddables.getByToken(token)

        if (!embeddable) return res
            .status(NOT_FOUND)
            .end();

        const page = await database.pages.get(
            getPageId(req.url)
        );

        //if (embeddable.page_id !== page.id && response.page_id !== page.id)
        if (embeddable.page_id !== page.id || response.page_id !== page.id)
            return res
                .status(BAD_REQUEST)
                .end()

        //Need to persist response in order to get its ID 
        const persistedResponse = await database.responses.create(response);
        await database.answers.createAnswers(
            answers.map(answer => ({
                ...answer,
                response_id: persistedResponse.id
            }))
        );

        return res
            .status(CREATED)
            .end();
    }
);