import {NextApiRequest, NextApiResponse} from "next";
import {LoginOptions} from "@auth0/nextjs-auth0/dist/handlers/login";
import {CallbackOptions} from "@auth0/nextjs-auth0/dist/handlers/callback";
import {ProfileOptions} from "@auth0/nextjs-auth0/dist/handlers/profile";
import {ISession} from "@auth0/nextjs-auth0/dist/session/session";
import {IApiRoute} from "@auth0/nextjs-auth0/dist/handlers/require-authentication";
import {AccessTokenRequest, AccessTokenResponse, ITokenCache} from "@auth0/nextjs-auth0/dist/tokens/token-cache";


export default ({
    handleLogin: (req: NextApiRequest, res: NextApiResponse, options?: LoginOptions) => {

        console.log("Inside login");
        // NO MOCK IMPLEMENTATION
    },

    handleCallback: (req: NextApiRequest, res: NextApiResponse, options?: CallbackOptions) => {
        console.log("Inside handlecallback");
        // NO MOCK IMPLEMENTATION
    },

    handleLogout: (req: NextApiRequest, res: NextApiResponse) => {
        console.log("Inside handleLogout");
        // NO MOCK IMPLEMENTATION
    },

    handleProfile: (req: NextApiRequest, res: NextApiResponse, options?: ProfileOptions) => {
        console.log("Inside handleProfile");
        // NO MOCK IMPLEMENTATION
    },

    getSession: async (req: NextApiRequest): Promise<ISession | null> => ({
        accessToken: undefined,
        accessTokenExpiresAt: 0,
        accessTokenScope: undefined,
        createdAt: 0,
        idToken: undefined,
        refreshToken: undefined,
        user: {}
    }),


    requireAuthentication: (apiRoute: IApiRoute): IApiRoute => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

        if (req.headers["x-mock-is-authenticated"]) {

            res.status(401).json({
                error: 'not_authenticated',
                description: 'The user does not have an active session or is not authenticated'
            });
            return;
        }

        await apiRoute(req, res)
    },

    tokenCache: (req: NextApiRequest, res: NextApiResponse) => {

        //ITokenCache
        // NO MOCK IMPLEMENTATION
    },
});