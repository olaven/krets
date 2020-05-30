import { NextApiRequest, NextApiResponse } from "next"; 
import auth0 from '../../../auth/auth0';

export default auth0.requireAuthentication(async function me (request, response) {

    const tokenCache = await auth0.tokenCache(request, response);
    const { accessToken } = await tokenCache.getAccessToken();

    try {
        await auth0.handleProfile(request, response, {
            refetch: true
        });
    } catch (error) {
        console.error(error);
        response.status(error.status || 500).end(error.message);
    }
});