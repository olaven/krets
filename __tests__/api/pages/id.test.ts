import { setupServer, teardownServer, uid, authenticatedFetch } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages/[id]";
import * as faker from "faker";
import { pages } from "../../../src/database/pages";
import { users } from "../../../src/database/users";
import fetch from "cross-fetch";
import PageId from "../../../src/pages/[pageId]";


jest.mock("../../../src/auth/auth0");

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
            name: faker.company.companyName(),
            category_id: null,
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

            expect(postStatus).toEqual(400);
            expect(patchtStatus).toEqual(400);
        });
    })

    describe("Endpoint for updating specific page", () => {

        const putFetch = (userId: string, pageId: string, payload: any) =>
            authenticatedFetch(
                userId,
                fullUrl(pageId),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );


        it("Returns 403 if user does not own the page", async () => {

            const owner = await createUser();
            const other = await createUser();

            const page = await createPage(owner.id);

            const { status } = await putFetch(other.id, page.id, page)
            expect(status).toEqual(403);
        });

        it("Returns 204 on succesful update", async () => {

            const user = await createUser();
            const page = await createPage(user.id);

            const { status } = await putFetch(user.id, page.id, page);
            expect(status).toEqual(204);
        });
    });

    describe("The deletion endpoint", () => {

        const deleteFetch = (pageId: string, userId: string) =>
            authenticatedFetch(userId, fullUrl(pageId), { method: "DELETE" });

        it("Returns 401 if user is not authenticated", async () => {

            const owner = await createUser();
            const page = await createPage(owner.id);

            //NOTE: no user information passed 
            const { status } = await fetch(fullUrl(page.id), { method: "DELETE" });
            expect(status).toEqual(401);
        });

        it("Returnd 403 if user does not own the page", async () => {

            const owner = await createUser();
            const other = await createUser();

            const page = await createPage(owner.id);

            const { status } = await deleteFetch(page.id, other.id);
            expect(status).toEqual(403);
        });

        it("Returns 204 on successful deletion", async () => {

            const owner = await createUser();
            const page = await createPage(owner.id);

            const { status } = await deleteFetch(page.id, owner.id);
            expect(status).toEqual(204);
        });
    });
});

