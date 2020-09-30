import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../apiTestUtils";
import userHandler from "../../../src/pages/api/users/index";
import { createAdmin, createBasicUser } from "./userTestUtils";
import { setupUsers } from "../../database/databaseTestUtils";
import { PageModel, PaginatedModel, UserModel } from "../../../src/models/models";



jest.mock("../../../src/auth/auth0");

describe("Endpoints for database user data", () => {


    let server;
    let url;

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
        [server, url] = await setupServer(userHandler, "/api/users/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });

    describe("Security rules", () => {

        it("Returns 401 if user is not authenticated", async () => {

            const { status } = await fetch(url);
            expect(status).toEqual(401);
        });

        it("Returns 403 if user is authenticated, but not admin", async () => {

            const user = await createBasicUser();
            const { status } = await authenticatedFetch(user.id, url);

            expect(user.role).not.toEqual("administrator");
            expect(status).toEqual(403);
        });

        it(" Does _not_ return 403 if user is admin", async () => {

            const user = await createAdmin();
            const { status } = await authenticatedFetch(user.id, url);

            expect(user.role).toEqual("administrator");
            expect(status).not.toEqual(403);
        });

        it(" Returns status code 200 if user is admin", async () => {

            const user = await createAdmin();
            const { status } = await authenticatedFetch(user.id, url);

            expect(user.role).toEqual("administrator")
            expect(status).toEqual(200);
        });
    });

    it("Returns a page", async () => {

        const admin = await createAdmin();
        await setupUsers(2); //NOTE: just making sure that some users are present

        const response = await authenticatedFetch(admin.id, url);
        const page = await response.json() as PaginatedModel<UserModel>;

        expect(page.data).toBeDefined();
        expect(page.next).toBeDefined();
    });

    it("Returns a list of users in page", async () => {

        const admin = await createAdmin();
        await setupUsers(2); //NOTE: just making sure that some users are present

        const response = await authenticatedFetch(admin.id, url);
        const page = await response.json() as PaginatedModel<UserModel>;


        expect(page.data.length).toBeGreaterThan(0);
        for (const user of page.data) {

            //~if it looks like a user, it is a user. 
            expect(user.id).toBeDefined();
            expect(user.role).toBeDefined();
            expect(user.created_at).toBeDefined();
        }
    });

    it("Returns a `next` link that returns furhter users", async () => {

        const admin = await createAdmin();
        await setupUsers(15); //NOTE: more than defualt page of 10

        const firstResponse = await authenticatedFetch(admin.id, url);
        const firstPage = await firstResponse.json() as PaginatedModel<UserModel>;

        const secondResponse = await authenticatedFetch(admin.id, firstPage.next);
        const secondPage = await secondResponse.json() as PaginatedModel<UserModel>;

        for (const user of secondPage.data) {

            //~if it looks like a user, it is a user. 
            expect(user.id).toBeDefined();
            expect(user.role).toBeDefined();
            expect(user.created_at).toBeDefined();
        }
    })
});

