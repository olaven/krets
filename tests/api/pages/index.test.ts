
import { authenticatedFetch, getPages, postPage, setupServer, teardownServer, uid } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages";
import { users } from "../../../src/database/database";
import { Server } from "net";
import * as faker from "faker";
import fetch from "cross-fetch";

jest.mock("../../../src/auth/auth0");

describe("The pages endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("does not give access when user is not authenticated", async () => {

        const response = await fetch(url, {});
        expect(response.status).toEqual(401);
    });

    it("does give access when user is authenticated", async () => {

        const response = await authenticatedFetch(uid(), url);
        expect(response.status).toEqual(200);
    });

    it("Is possible to create a page if authenticated", async () => {

        const userId = uid();
        await users.createUser({
            id: userId
        });

        const response = await postPage({
            id: faker.random.alphaNumeric(40), name: "My Page", owner_id: userId
        }, url, userId);

        expect(response.status).toEqual(201)
    });

    it("/pages returns all pages belonging to given user", async () => {

        const n = 5;
        const user = await users.createUser({
            id: uid()
        });

        const before = await getPages(url, user.id);

        for (let i = 0; i < n; i++) {

            await postPage({
                id: faker.random.uuid(), name: faker.company.companyName(), owner_id: user.id
            }, url, user.id);
        }

        const after = await getPages(url, user.id);
        //expect(before.length).toEqual(0);
        expect(after.length).toEqual(before.length + n);
    });
});