import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { BAD_REQUEST } from "node-kall"


/*
 * Handling errors and sending proper error response if 
 * they occur. 
 * 
 * sends error.status || BAD_REQUEST
*/
export const withErrorHandling = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        try {

            await handler(request, response);
        } catch (error) {

            if (process.env.NODE_ENV === 'development')
                console.log(`Caught error: ${error}`);

            return response
                .status(error.status || BAD_REQUEST)
                .send("Request may have been malformed :-/");
        }
    }