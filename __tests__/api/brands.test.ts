import "reflect-metadata";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import brands from "../../src/pages/api/brands";
import {Server} from "net";
import auth0 from "../../src/auth/auth0"
import {ISession} from "@auth0/nextjs-auth0/dist/session/session";
import {ISessionStore} from "@auth0/nextjs-auth0/dist/session/store";
import {NextApiRequest} from "next";

const getSession = (session, request: NextApiRequest): ISessionStore => {
    const store: ISessionStore = {
        read(): Promise<ISession | null | undefined> {
            return Promise.resolve(session);
        },
        save(): Promise<ISession | null | undefined> {
            return Promise.resolve(session);
        }
    };

    if (saveStore) {
        store.save = saveStore;
    }

    return store;
};

expect(mockedUseAuth0).toHaveBeenCalled();

mockedUseAuth0.mockReturnValue({
  isAuthenticated: true,
  user,
  logout: jest.fn(),
  loginWithRedirect: jest.fn()
});

describe("The brand endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(brands);
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("does not give access when user is not authenticated", async () => {

        const response = await fetch(url);
        expect(response.status).toEqual(401);
    })
});