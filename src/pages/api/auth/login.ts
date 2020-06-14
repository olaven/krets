import next, { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../auth/auth0';
import { BAD_REQUEST } from '../../../http/codes';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogin(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || BAD_REQUEST).end(error.message);
    }
}