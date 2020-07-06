import { setupServer, teardownServer, uid } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages/[id]";
import * as faker from "faker";
import { pages } from "../../../src/database/pages";
import { users } from "../../../src/database/users";
import fetch from "cross-fetch";

describe("Endpoints for specific page", () => {


    let server;
    let url;

    const fullUrl = (brandId) =>
        `${url}${brandId}`;


    const createUser = (id = uid()) =>
        users.createUser({ id });

    const createPage = async (ownerId: string) => {

        const id = uid();
        const page = {
            id: uid(),
            owner_id: ownerId,
            name: faker.company.companyName()
        };

        await pages.createPage(page)
        return page;
    }

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
        [server, url] = await setupServer(handler, "/api/pages/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });


    describe("GET requests on specific page", () => {
        it("Returns 200 if page exists", async () => {

            const user = await createUser();
            const page = await createPage(user.id);

            const full = fullUrl(page.id);

            const getResponse = await fetch(full);
            expect(getResponse.status).toEqual(200);
        });

        it("Returns 404 if page does not exists", async () => {

            //NOTE: generating new id instead of using one attached to a page
            const url = fullUrl(uid());
            const getResponse = await fetch(url);
            expect(getResponse.status).toEqual(404);
        });

        it("Returns 400 if method is not supported", async () => {

            const { id } = await createUser()
            const page = await createPage(id);
            const statusFromFetch = async (method: string) => {

                const { status } = await fetch(fullUrl(page.id), { method })
                return status;
            }

            const postStatus = await statusFromFetch("POST");
            const patchtStatus = await statusFromFetch("PATCH");
            const deleteStatus = await statusFromFetch("DELETE");

            expect(postStatus).toEqual(400);
            expect(patchtStatus).toEqual(400);
            expect(deleteStatus).toEqual(400);
        });
    })

    describe("Endpoint for updating specific page", () => {

        test("Returns 400 if no data is provided", async () => {

            const user = await createUser();
            const page = await createPage(user.id);

            const response = await fetch(fullUrl(page.id), { method: "PUT" });
            expect(response.status).toEqual(400);
        });
    })
});

