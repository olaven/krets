
import { authenticatedFetch, getPages, postPage, setupServer, teardownServer, uid, randomPage } from "./apiTestUtils";
import handler from "../../src/pages/api/pages";
import faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { createUser } from "../database/databaseTestUtils";
import { getCategories } from "./apiTestUtils";
import { CategoryModel } from "../../src/models";
import { categories } from "../../src/database/categories";

jest.mock("../../src/auth/auth0");

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

            const user = await createUser();
            const response = await authenticatedFetch(user.id, url);

            expect(response.status)
                .toEqual(200)
        });

        it("Returns an array", async () => {

            const user = await createUser();
            const categories = await getCategories(user.id, url);

            //NOTE: user is just created, and has no categories 
            expect(categories).toEqual([]);
        });

        it("Returns category objects", async () => {

            const user = await createUser();
            const n = faker.random.number(8) + 2;

            const persisted: CategoryModel[] = [];
            for (let i = 0; i < n; i++) {

                const category = await categories.createCategory(randomCategory(user.id))
                expect(category.owner_id).toEqual(user.id);//trying to find mistake 
                persisted.push(category);
            }

            const retrieved = await getCategories(user.id, url);

            expect(persisted.length).toEqual(n);
            expect(retrieved.length).toEqual(n);
            expect(retrieved).toEqual(persisted)
        });
    });
});