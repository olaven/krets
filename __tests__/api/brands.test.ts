import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import handler from "../../src/pages/api/brands";
import {Server} from "net";


jest.mock("../../src/auth/auth0");

describe("The brand endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/brands");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("does not give access when user is not authenticated", async () => {


        const response = await fetch(url, {
            headers: {
                'x-mock-is-authenticated': "true"
            }
        });
        expect(response.status).toEqual(401);
    });

    it("does give access when user is authenticated", async () => {

        const response = await fetch(url);
        expect(response.status).toEqual(200);
    })
});