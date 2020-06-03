import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {setupServer, teardownServer, uid} from "../testutils";
import handler from "../../../src/pages/api/pages/[id]";
import * as faker from "faker";
import {pages} from "../../../src/database/pages";
import {users} from "../../../src/database/users";

describe("Endpoint for getting a specific page", () => {


    let server;
    let url;

    const fullUrl = (brandId) =>
        `${url}${brandId}`;

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
       [server, url] = await setupServer(handler, "/api/pages/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });

    it("Returns 200 if page exists", async () => {

        const user = await users.createUser({
            id: faker.random.uuid()
        });
        const page = {
            id: uid(),
            owner_id: user.id,
            name: faker.company.companyName()
        };
        const result = pages.createPage(page);

        const full = fullUrl(page.id);

        const getResponse = await fetch(full);
        expect(getResponse.status).toEqual(200);
    });

    it("Returns 404 if page does not exists", async () => {

        //NOTE: generating new id instead of using one attached to a page
        const url = fullUrl(uid());
        console.log("URL: ", url);
        const getResponse = await fetch(url);
        expect(getResponse.status).toEqual(404);
    });
});