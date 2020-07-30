
import { authenticatedFetch, getPages, postPage, setupServer, teardownServer, uid } from "../apiTestUtils";
import handler from "../../../src/pages/api/pages";
import { users } from "../../../src/database/database";
import { Server } from "net";
import * as faker from "faker";
import fetch from "cross-fetch";
import { randomUser, randomPage } from "../../database/databaseTestUtils";

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

            const userId = uid();
            await users.createUser({
                id: userId
            });

            const response = await postPage({
                id: faker.random.alphaNumeric(40), name: "My Page", owner_id: userId
            }, url, userId);

            expect(response.status).toEqual(201)
        });

        it("Assigns a pseudo-random color value to the page", async () => {

            const user = await users.createUser(randomUser());
            const page = randomPage(user.id);

            expect(page.color).toBeNull();
            await postPage(page, url, user.id);
            const [retrieved] = await getPages(`${url}/${page.id}`, user.id);

            expect(retrieved.id).toEqual(page.id);
            expect(retrieved.color).toBeDefined();
        });

        it("Assigns a hex value as the color", async () => {

            const user = await users.createUser(randomUser());
            const page = randomPage(user.id);

            await postPage(randomPage(user.id), url, user.id);
            const [retrieved] = await getPages(`${url}/${page.id}`, user.id);

            expect(retrieved.color.length).toEqual(7);
            expect(retrieved.color[0]).toEqual("#");
        });

        it("Assigns different colors", async () => {

            const user = await users.createUser(randomUser());

            await postPage(randomPage(user.id), url, user.id);
            await postPage(randomPage(user.id), url, user.id);

            const [first, second] = await getPages(url, user.id);
            expect(first.color).not.toEqual(second.color);
        });
    })

    describe("Retrieving pages", () => {

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
    })

});