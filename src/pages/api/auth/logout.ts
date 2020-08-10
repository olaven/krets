import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../auth/auth0';
import { BAD_REQUEST } from 'node-kall';

/* export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogout(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || BAD_REQUEST).end(error.message);
    }
} */


/*
 * NOTE: Abstraction currently used by /login and /logout. 
 * As paths = API routes in NextJS, I have not created a separate file for this. 
 * However, I probably should at some point. 
*/
export const auth0HandleWrapper = (handler: (request: NextApiRequest, response: NextApiResponse) => any) =>
    async (request: NextApiRequest, response: NextApiResponse) => {
        try {

            await handler(request, response);
        } catch (error) {

            console.error(error);
            response.status(error.status || BAD_REQUEST).end(error.message);
        }
    }

export default auth0HandleWrapper(auth0.handleLogout);

