import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import handler from "../../src/pages/api/brands";
import {Server} from "net";
import {NextApiRequest, NextApiResponse} from "next";
import {LoginOptions} from "@auth0/nextjs-auth0/dist/handlers/login";
import {CallbackOptions} from "@auth0/nextjs-auth0/dist/handlers/callback";
import {ProfileOptions} from "@auth0/nextjs-auth0/dist/handlers/profile";
import {IApiRoute} from "@auth0/nextjs-auth0/dist/handlers/require-authentication";
import {IClaims, ISession} from "@auth0/nextjs-auth0/dist/session/session";
import {AccessTokenRequest, AccessTokenResponse, ITokenCache} from "@auth0/nextjs-auth0/dist/tokens/token-cache";

jest.mock("../../src/auth/auth0", () => ({

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

    getSession: async (req: NextApiRequest): Promise<ISession> => {

        console.log("Inside getsession");

        //Promise<ISession | null | undefined>
        return {
            accessToken: undefined,
            accessTokenExpiresAt: 0,
            accessTokenScope: undefined,
            createdAt: 0,
            idToken: undefined,
            refreshToken: undefined,
            user: {

            }
        }
    },

    requireAuthentication: (apiRoute: IApiRoute) => {

        console.log("Inside requireauthentication");
        return apiRoute
    },

    tokenCache: (req: NextApiRequest, res: NextApiResponse) => {

        //ITokenCache
        const cache: ITokenCache = {
            getAccessToken(accessTokenRequest?: AccessTokenRequest): Promise<AccessTokenResponse> {

                return new Promise<AccessTokenResponse>(() => ({
                    accessToken: "ACCESS TOKEN :D"
                }));
            }
        }
    },
}));




describe("The brand endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        console.log("Handler passed; ");
        [server, url] = await setupServer(handler, "/api/brands");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("does not give access when user is not authenticated", async () => {

        console.log("URL: ", url);
        const response = await fetch(url);
        expect(response.status).toEqual(401);
    })
});