import next, { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../auth/auth0';
import { BAD_REQUEST } from 'node-kall';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogin(req, res);
    } catch (error) {

        if (error.errorMessage.includes("Cannot find module 'next/dist/next-server/server/node-polyfill-fetch'")) {

            //TODO: temp. fix on inexplainable crash
            res.status(200).send("Ignored this error <3");
            return;
        }

        console.error(error);
        res.status(error.status || BAD_REQUEST).end(error.message);
    }
}