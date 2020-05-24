import { NextApiRequest, NextApiResponse } from "next"; 
import auth0 from '../../auth/auth0';

export default async function me(req: NextApiRequest, res: NextApiResponse) {

    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();

    try {
        await auth0.handleProfile(req, res, {
            refetch: true
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}