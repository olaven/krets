import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../auth/auth0';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogout(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}