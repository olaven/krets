import * as faker from "faker";
import fetch from "cross-fetch";
import { users, categories, pages } from "../../../src/database/database"
import { randomUser } from "../../database/databaseTestUtils";
import { setupServer, teardownServer, uid, authenticatedFetch, randomPage } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages/[id]";



jest.mock("../../../src/auth/auth0");

describe("Endpoints for specific page", () => {

    let server;
    let url;

    const fullUrl = (brandId) =>
        `${url}${brandId}`;


    const createPage = async (ownerId: string, categoryId: string = null) => {

        const id = uid();
        const page = {
            id: uid(),
            owner_id: ownerId,
            name: faker.company.companyName(),
            category_id: categoryId,
        };

        await pages.createPage(page)
        return page;
    }

    const createCategory = (ownerId: string) =>
        categories.createCategory({
            name: faker.lorem.word(),
            owner_id: ownerId
        })

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
        [server, url] = await setupServer(handler, "/api/pages/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });


    describe("GET requests on specific page", () => {
        it("Returns 200 if page exists", async () => {

            const user = await users.createUser(randomUser());
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

            const { id } = await users.createUser(randomUser())
            const page = await createPage(id);
            const statusFromFetch = async (method: string) => {

                const { status } = await fetch(fullUrl(page.id), { method })
                return status;
            }

            const postStatus = await statusFromFetch("POST");
            const patchtStatus = await statusFromFetch("PATCH");

            expect(postStatus).toEqual(405);
            expect(patchtStatus).toEqual(405);
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

            const owner = await users.createUser(randomUser());
            const other = await users.createUser(randomUser());

            const page = await createPage(owner.id);

            const { status } = await putFetch(other.id, page.id, page)
            expect(status).toEqual(403);
        });

        it("Returns 204 on succesful update", async () => {

            const user = await users.createUser(randomUser());
            const page = await createPage(user.id);

            const { status } = await putFetch(user.id, page.id, page);
            expect(status).toEqual(204);
        });

        it("Returns 404 if the page does not exist", async () => {

            const user = await users.createUser(randomUser());
            const page = randomPage(user.id); //NOTE: never persisted

            const { status } = await putFetch(user.id, page.id, page);
            expect(status).toEqual(404);
        });

        it("Returns 204 on succesful category update ", async () => {

            const user = await users.createUser(randomUser());
            const page = await createPage(user.id);
            const category = await createCategory(user.id);

            page.category_id = category.id;

            const pageBeforeUpdate = await pages.getPage(page.id);
            await putFetch(user.id, page.id, page);
            const pageAfterUpdate = await pages.getPage(page.id);

            expect(pageBeforeUpdate.category_id).toBeNull();
            expect(pageAfterUpdate.category_id).toEqual(category.id);
        });

        //NOTE: should perhaps be 404
        it("Returns 400 if category does not exist", async () => {

            const user = await users.createUser(randomUser());
            const page = await createPage(user.id);


            //NOTE: category id does not exist (may fail due to randomness, but very unlikely)
            page.category_id = faker.random.number().toString();

            const pageBeforeUpdate = await pages.getPage(page.id);
            const { status } = await putFetch(user.id, page.id, page);
            const pageAfterUpdate = await pages.getPage(page.id);

            expect(status).toEqual(400);
            expect(pageBeforeUpdate.category_id).toBeNull();
            expect(pageAfterUpdate.category_id).toBeNull();
        });
    });

    describe("The DELETE endpoint of pages", () => {

        const deleteFetch = (pageId: string, userId: string) =>
            authenticatedFetch(userId, fullUrl(pageId), { method: "DELETE" });

        it("Returns 401 if user is not authenticated", async () => {

            const owner = await users.createUser(randomUser());
            const page = await createPage(owner.id);

            //NOTE: no user information passed 
            const { status } = await fetch(fullUrl(page.id), { method: "DELETE" });
            expect(status).toEqual(401);
        });

        it("Returnd 403 if user does not own the page", async () => {

            const owner = await users.createUser(randomUser());
            const other = await users.createUser(randomUser());

            const page = await createPage(owner.id);

            const { status } = await deleteFetch(page.id, other.id);
            expect(status).toEqual(403);
        });

        it("Returns 204 on successful deletion", async () => {

            const owner = await users.createUser(randomUser());
            const page = await createPage(owner.id);

            const { status } = await deleteFetch(page.id, owner.id);
            expect(status).toEqual(204);
        });
    });
});

