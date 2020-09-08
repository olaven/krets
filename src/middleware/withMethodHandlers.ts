import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface Handlers {
    GET?: NextApiHandler,
    POST?: NextApiHandler,
    PUT?: NextApiHandler,
    DELETE?: NextApiHandler,
    HEAD?: NextApiHandler,
    OPTIONS?: NextApiHandler,
}

/**
 * Executes the correct handler based on the request method. 
 * @param handlers 
 * 
 * NOTE: This is currently experimental. #138
 */
export const withMethodHandlers = (handlers: Handlers) =>
    (request: NextApiRequest, response: NextApiResponse) => {

        const { method } = request;
        const handler = handlers[method]

        if (handler) handler(request, response);
        else return response
            .status(405)
            .end();
    }