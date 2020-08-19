import { Server } from "net";
import fetch from "cross-fetch";
import * as faker from "faker";
import { authenticatedFetch, getPages, postPage, setupServer, teardownServer, uid, randomPage } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages";
import { users } from "../../../src/database/database";
import { randomUser, setupPages } from "../../database/databaseTestUtils";

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

    describe("The access control", () => {


        it("does not give access when user is not authenticated", async () => {

            const response = await fetch(url, {});
            expect(response.status).toEqual(401);
        });

        it("does give access when user is authenticated", async () => {

            const response = await authenticatedFetch(uid(), url);
            expect(response.status).toEqual(200);
        });
    });

    describe("Creation of pages", () => {


        it("Is possible to create a page if authenticated", async () => {

            const user = await users.createUser(randomUser());

            const response = await postPage({
                id: faker.random.alphaNumeric(40), name: "My Page", owner_id: user.id
            }, url, user.id);

            expect(response.status).toEqual(201)
        });

        it("Assigns a pseudo-random color value to the page", async () => {
            const user = await users.createUser(randomUser());
            const page = randomPage(user.id);

            expect(page.color).toBeNull();
            await postPage(page, url, user.id);
            const [retrieved] = (await getPages(`${url}/${page.id}`, user.id)).data;

            expect(retrieved.id).toEqual(page.id);
            expect(retrieved.color).toBeDefined();
        });

        it("Assigns a hex value as the color", async () => {

            const user = await users.createUser(randomUser());
            const page = randomPage(user.id);

            await postPage(randomPage(user.id), url, user.id);
            const [retrieved] = (await getPages(`${url}/${page.id}`, user.id)).data;

            expect(retrieved.color.length).toEqual(7);
            expect(retrieved.color[0]).toEqual("#");
        });

        it("Assigns different colors", async () => {

            const user = await users.createUser(randomUser());

            await postPage(randomPage(user.id), url, user.id);
            await postPage(randomPage(user.id), url, user.id);

            const [first, second] = (await getPages(url, user.id)).data;
            expect(first.color).not.toEqual(second.color);
        });

        it("Returns 409 on conflict", async () => {

            const user = await users.createUser(randomUser());
            const page = randomPage(user.id);

            const first = await postPage(page, url, user.id);
            const second = await postPage(page, url, user.id);

            expect(first.status).toEqual(201);
            expect(second.status).toEqual(409);
        });
    })

    describe("Retrieving pages", () => {

        it("/pages returns all pages belonging to given user", async () => {

            const n = 5;
            const user = await users.createUser(randomUser());

            const before = (await getPages(url, user.id)).data;

            for (let i = 0; i < n; i++) {

                await postPage({
                    id: faker.random.uuid(), name: faker.company.companyName(), owner_id: user.id
                }, url, user.id);
            }

            const after = (await getPages(url, user.id)).data;
            //expect(before.length).toEqual(0);
            expect(after.length).toEqual(before.length + n);
        });

        it("Returns PaginatedModel as response", async () => {

            const [user] = await setupPages(20)
            const retrieved = await getPages(url, user.id);

            expect(retrieved.data).toBeDefined();
            expect(retrieved.next).toBeDefined();
        });

        it("Returns a page size of 15 elements", async () => {

            const [user, persisted] = await setupPages(20) //NOTE: > pageSize
            const retrieved = await getPages(url, user.id);

            expect(retrieved.data.length).toEqual(15);
            expect(retrieved.data.length).toBeLessThan(persisted.length);
        });

        it("Returns a `next`-link to more resources", async () => {

            const [user] = await setupPages(35); // two full pages + one page with 5

            const firstPage = await getPages(url, user.id);
            const secondPage = await getPages(`${url}${firstPage.next}`, user.id);
            const thirdPage = await getPages(`${url}${secondPage.next}`, user.id);

            expect(firstPage.data.length).toEqual(15);
            expect(secondPage.data.length).toEqual(15);
            expect(thirdPage.data.length).toEqual(5); // i.e. the remaining ones 
        });
    });
});