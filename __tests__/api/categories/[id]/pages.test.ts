
import { authenticatedFetch, setupServer, teardownServer, authenticatedGet } from "../../apiTestUtils";
import handler from "../../../../src/pages/api/categories/[id]/pages";
import faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { createUser, createCategory, createPage } from "../../../database/databaseTestUtils";
import { PageModel } from "../../../../src/models";

jest.mock("../../../../src/auth/auth0");

describe("The pages by categories endpoint", () => {

    let server: Server;
    let baseURL: string;

    const url = (categoryId: string) =>
        `${baseURL}/${categoryId}/pages`;

    beforeAll(async () => {

        [server, baseURL] = await setupServer(handler, "/api/categories");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    describe("URL utility in this test suite", () => {

        it("Returns the proper URL with given ID", () => {

            const id = faker.random.uuid();
            const result = url(id);

            expect(result)
                .toContain("api/categories/" + id + "/pages");
        })
    })

    describe("GET endpoint", () => {

        it("Returns status code 401 if not authenticated", async () => {
            const { status } = await fetch(url("some-page"));
            expect(status)
                .toEqual(401);
        });
        it("Returns status code 200 on authenticated request", async () => {

            const user = await createUser();
            const category = await createCategory(user.id);
            const { status } = await authenticatedFetch(user.id, url(category.id));

            expect(status)
                .toEqual(200);
        });

        it("Only returns pages owned by given user and from given category", async () => {

            const user = await createUser();
            const category = await createCategory(user.id);

            const persisted: PageModel[] = [];
            for (let i = 0; i < (faker.random.number(4) + 1); i++) {

                const page = await createPage(user.id, category.id);
                persisted.push(page);
            }

            const pages = await authenticatedGet<PageModel[]>(user.id, url(category.id));

            pages.forEach(page => {

                expect(page.owner_id).toEqual(user.id);
                expect(page.category_id).toEqual(category.id);
            });
        });
    });
});