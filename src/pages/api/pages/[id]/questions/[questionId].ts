import { NextApiRequest, NextApiResponse } from "next";
import { withErrorHandling, withAuthentication, withMethodHandlers } from "../../../../../middleware/middleware";

const putQuestion = async (request: NextApiRequest, response: NextApiResponse) => {

    response.status(504).end();
}

const deleteQuestion = async (request: NextApiRequest, response: NextApiResponse) => {

    response.status(504).end();
}

export default withErrorHandling(
    withMethodHandlers({ //NOTE: wrapping authentication twice, as 405 should be prioritized over 401
        PUT: withAuthentication(putQuestion),
        DELETE: withAuthentication(deleteQuestion),
    })
);