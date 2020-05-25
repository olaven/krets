import {afterAll, beforeAll, describe, expect, it, test} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import brands from "../../src/pages/api/brands";
import {Server} from "net";

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