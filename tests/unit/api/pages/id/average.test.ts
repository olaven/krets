import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../apiTestUtils";
import averageHandler from '../../../../src/pages/api/pages/[id]/average';
import { database } from "../../../../src/database/database";
import { randomUser, randomPage } from "../../../database/databaseTestUtils";

jest.mock("../../../../src/auth/auth0");

describe("The endpoint for average all-time score", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/average`;

    beforeAll(async () => {

        [server, url] = await setupServer(averageHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    describe("The test utilities", () => {

        it("has correct fullUL", () => {

            const url = fullURL("min-andre-side");
            expect(url).toContain("/api/pages/min-andre-side/average")
        });
    });

    describe("The actual endpoint", () => {

        it("Returns 405 on methods other than GET", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));
            for (const method of ["PUT", "PATCH", "POST", "HEAD", "DELETE"]) {

                const { status } = await authenticatedFetch(user.id, fullURL(page.id), { method });
                expect(status).toEqual(405);
            }
        });

        it("Returns 401 if not authenticated", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            //NOTE: not claiming to be user 
            const response = await fetch(fullURL(page.id));
            expect(response.status).toEqual(401)
        });

        it("Returns 200 if authenticated", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            const response = await authenticatedFetch(user.id, fullURL(page.id));
            expect(response.status).toEqual(200);
        });

        it("Returns a number", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            const response = await authenticatedFetch(user.id, fullURL(page.id));
            expect(response.status).toEqual(200);

            const body = await response.text();
            expect(parseInt(body)).not.toBeNaN();
        });

        it("Returns actual average", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-)",
                //text: ""
            }); // 2

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-|",
                //text: ""
            }); // 1

            const url = fullURL(page.id);
            const fetchResponse = await authenticatedFetch(user.id, url);
            expect(fetchResponse.status).toEqual(200);

            const body = await fetchResponse.text();
            //NOTE: 2 and 1 makes for an average of 1.5
            expect(parseFloat(body)).toEqual(1.5);
        });


        it("Returns actual average of second combination", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-|",
                //text: ""
            }); // 1

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-)",
                //text: ""
            }); // 2

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-)",
                //text: ""
            }); // 2

            await database.responses.createResponse({
                page_id: page.id,
                emotion: ":-)",
                //text: ""
            }); // 2

            const url = fullURL(page.id);
            const fetchResponse = await authenticatedFetch(user.id, url);
            expect(fetchResponse.status).toEqual(200);

            const body = await fetchResponse.text();
            //NOTE: (1 + 2 + 2 + 2) / 4 gives 1.75
            expect(parseFloat(body)).toEqual(1.75);
        });
    })
});