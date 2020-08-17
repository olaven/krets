import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type Method = 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST' | 'OPTION' | 'HEAD'

/**
 * Executes handler if and only if the request method 
 * is in list of allowed methods. 
 * If not, 400 BAD REQUEST is sent
 * 
 * @param methods list of allowed methods
 */
export const withMethods = (methods: Method[]) =>
    (handler: NextApiHandler) =>
        (request: NextApiRequest, response: NextApiResponse) => {

            const included = methods.includes(request.method as Method);
            included ?
                handler(request, response) :
                response
                    .status(405)
                    .send(null);
        }