import { NextApiRequest, NextApiResponse } from "next";
import { NOT_IMPLEMENTED } from "node-kall";
import { withErrorHandling, withAuthentication, withMethodHandlers, asPageOwner } from "../../../../middleware/middleware"
import { getPathParam } from "../../../../workarounds";


const postEmbeddable = asPageOwner(
    url => getPathParam(url, 2),
    (request, response) => {

        //TODO: implement
        response
            .status(NOT_IMPLEMENTED)
            .end();
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