
import { authenticatedFetch, getPages, postPage, setupServer, teardownServer, uid, randomPage } from "apiTestUtils";
import handler from "../../src/pages/api/pages";
import faker from "faker";
import { users } from "../../src/database/users";
import { Server } from "net";
import fetch from "cross-fetch";
import { createUser } from "../database/databaseTestUtils";
import { getCategories } from "./apiTestUtils";
import { getPage } from "../../src/http/fetchers";

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

    describe("Endpoint for getting categories by owner", () => {


        it("Returns 401 if the user is not authenticated", async () => {

            const response = await fetch(`/api/categories`);
            expect(response.status)
                .toEqual(401);
        });

        it("Returns status code OK", async () => {

            const user = await createUser();
            const response = await authenticatedFetch(user.id, `/api/categories`);

            expect(response.status)
                .toEqual(200)
        });

        it("Returns an array", async () => {

            const user = await createUser();
            const categories = await getCategories(user.id);

            //NOTE: user is just created, and has no categories 
            expect(categories).toEqual([]);
        });

        it("Returns categories", async () => {

            const user = await createUser();
            const n = faker.random.number(8);

            const allPersisted = [];
            for (let i = 0; i < n; i++) {

                const category = createCategory(); // GET THIS 
                postCategory(category);
                allPersisted.push(category);
            }

            const fromApi = await getCategories(user.id);
            for (let i = 0; i < n; i++) {

                const retrieved = fromApi[i];
                const persisted = allPersisted[i];

                //TODO see that retrieved is in perssited. 
                expect(false).toBeTruthy();
            }
        });
    });
});