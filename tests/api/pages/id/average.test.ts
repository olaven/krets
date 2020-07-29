import { setupServer, teardownServer, authenticatedFetch } from "../../apiTestUtils";
import { Server } from "net";
import handler from '../../../../src/pages/api/pages/[id]/responses';
import { users } from "../../../../src/database/users";
import { pages } from "../../../../src/database/pages";
import { responses } from "../../../../src/database/responses";
import fetch from "cross-fetch";
import { randomUser, randomPage } from "../../../database/databaseTestUtils";

jest.mock("../../../../src/auth/auth0");

describe("The endpoint for average all-time score", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/average`;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("Returns 401 if not authenticated", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));

        //NOTE: not claiming to be user 
        const response = await fetch(fullURL(page.id));
        expect(response.status).toEqual(401)
    });

    it("Returns 200 if authenticated", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));

        const response = await authenticatedFetch(user.id, fullURL(page.id));
        expect(response.status).toEqual(200);
    });

    it("Returns a number", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));

        const response = await authenticatedFetch(user.id, fullURL(page.id));
        expect(response.status).toEqual(200);

        const body = await response.text();
        expect(parseInt(body)).not.toBeNaN();
    });

    it("Returns actual average", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));

        await responses.createResponse({
            page_id: page.id,
            emotion: ":-)",
            text: ""
        }); // 3

        await responses.createResponse({
            page_id: page.id,
            emotion: ":-|",
            text: ""
        }); // 2
        //NOTE: 3 and 2 makes for an average of 2.5
        const fetchResponse = await authenticatedFetch(user.id, fullURL(page.id));
        expect(fetchResponse.status).toEqual(200);

        const body = await fetchResponse.text();
        //NOTE: 3 and 2 makes for an average of 2.5
        expect(parseInt(body)).toEqual(2.5);
    })
});