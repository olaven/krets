
import { authenticatedFetch, setupServer, teardownServer, postCategory, authenticatedGet } from "../apiTestUtils";
import handler from "../../../src/pages/api/categories/index";
import faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { CategoryModel } from "../../../src/models";
import { users } from "../../../src/database/users";
import { randomUser } from "../../database/databaseTestUtils";

jest.mock("../../../src/auth/auth0");

describe("The categories endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/categories");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    const randomCategory = (ownerId: string): CategoryModel => ({
        name: faker.company.companyName(),
        owner_id: ownerId,
    });

    describe("Endpoint for getting categories by owner", () => {


        it("Returns 401 if the user is not authenticated", async () => {

            const response = await fetch(url);
            expect(response.status)
                .toEqual(401);
        });

        it("Returns status code OK", async () => {

            const user = await users.createUser(randomUser());
            const response = await authenticatedFetch(user.id, url);

            expect(response.status)
                .toEqual(200)
        });

        it("Returns an array", async () => {

            const user = await users.createUser(randomUser());
            const categories = await authenticatedGet(user.id, url);

            //NOTE: user is just created, and has no categories 
            expect(categories).toEqual([]);
        });

        it.skip("Returns category objects", async () => {

            const user = await users.createUser(randomUser());
            const n = faker.random.number(8) + 2;

            const persisted: CategoryModel[] = [];
            for (let i = 0; i < n; i++) {

                const category = randomCategory(user.id);
                await postCategory(user.id, url, category);
                persisted.push(category);
            }

            const retrieved = await authenticatedGet<CategoryModel[]>(user.id, url);

            expect(persisted.length).toEqual(n);
            expect(retrieved.length).toEqual(n);
            expect(retrieved).toEqual(persisted)
        });
    });
});