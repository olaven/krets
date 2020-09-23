import { nanoid } from "nanoid"
import { BAD_REQUEST, CREATED, NOT_IMPLEMENTED } from "node-kall";
import { embeddables } from "../../../../database/database";
import { pages } from "../../../../database/pages";
import { withErrorHandling, withAuthentication, withMethodHandlers, asPageOwner } from "../../../../middleware/middleware"
import { EmbeddableModel } from "../../../../models/models";
import { getPathParam } from "../../../../workarounds";

const getPageId = url => getPathParam(url, 2);

const postEmbeddable = asPageOwner(
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
);

export default withErrorHandling(
    withAuthentication(
        withMethodHandlers({
            POST: postEmbeddable,
            PUT: () => { } //or similar, for verifying endpoint
        })

    )
);