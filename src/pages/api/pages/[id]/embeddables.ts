import { nanoid } from "nanoid";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "node-kall";
import { database } from "../../../../database/database";
import { withErrorHandling, withAuthentication, withMethodHandlers, asPageOwner, withCors } from "../../../../middleware/middleware"
import { EmbeddableModel } from "../../../../models/models";
import { getPathParam } from "../../../../workarounds";

const getPageId = url => getPathParam(url, 2);

const getEmbeddable = async (request, response) => {

    const embeddable = await database.embeddables.getByPage(
        getPageId(request.url)
    );

    if (!embeddable)
        return response
            .status(NOT_FOUND)
            .end();

    response.json(embeddable);
}


const postEmbeddable = async (request, response) => {

    const embeddable = request.body as EmbeddableModel;
    if (!embeddable.page_id) //THINKABOUT: unessecary to send body at all - all data is generated server side (also page-id)
        return response
            .status(BAD_REQUEST)
            .end()

    const page = await database.pages.get(
        getPageId(request.url)
    );

    const persisted = await database.embeddables.createEmbeddable({
        ...embeddable,
        page_id: page.id,
        token: nanoid(),
    });

    return response
        .status(CREATED)
        .send(persisted);
}




export default withCors(
    withAuthentication(
        withErrorHandling(
            asPageOwner(
                getPageId,
                withMethodHandlers({
                    GET: getEmbeddable,
                    POST: postEmbeddable,
                })
            )
        )
    )
);