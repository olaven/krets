import fetch from "cross-fetch";
import { users } from "../../../src/database/database"
import { randomUser } from "../../database/databaseTestUtils";
import { setupServer, teardownServer, authenticatedFetch } from "../apiTestUtils";
import userHandler from "../../../src/pages/api/users/[id]";
import { UserModel } from "../../../src/models/models";
import { mockFetch } from "../../frontend/frontendTestUtils";



jest.mock("../../../src/auth/auth0");
jest.mock("request")

describe("Endpoints for database user data", () => {


    let server;
    let url;

    const fullUrl = (uid) =>
        `${url}${uid}`;

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
        [server, url] = await setupServer(userHandler, "/api/users/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });


    describe("The endpoint for user data from database", () => {

        mockFetch(null, 204);

        it("Only responds to GET and DELETE", async () => {

            const { id } = await users.createUser(randomUser())

            const getResponse = await authenticatedFetch(id, fullUrl(id), { method: "GET" });
            const deleteResponse = await authenticatedFetch(id, fullUrl(id), { method: "DELETE" });

            expect(getResponse.status).toEqual(200);
            expect(deleteResponse.status).not.toEqual(405);

            for (let method of ["PUT", "PATCH", "HEAD", "OPTIONS"]) {

                const { status } = await authenticatedFetch(id, fullUrl(id), { method });
                expect(status).toEqual(405);
            }
        });

        it("Responds with 401 if unauthenticated", async () => {

            const { status } = await fetch(fullUrl("some_user"));
            expect(status).toEqual(401);
        });

        it("Does return user as it is represented in database", async () => {

            const user = await users.createUser(randomUser());
            const response = await authenticatedFetch(user.id, fullUrl(user.id));

            expect(200).toEqual(response.status);

            const retrieved = await response.json() as UserModel;

            expect(retrieved.customer_id).toBeDefined()
            expect(retrieved.id).toBeDefined() //i.e. not 'sub', as in auth0
        });

        it("Does not allow returning other users data", async () => {

            const actor = await users.createUser(randomUser());
            const other = await users.createUser(randomUser());

            const { status } = await authenticatedFetch(actor.id, fullUrl(other.id));

            expect(status).toEqual(403);
        });

        it("Does not allow to delete other users", async () => {

            const actor = await users.createUser(randomUser());
            const other = await users.createUser(randomUser());

            const { status } = await authenticatedFetch(actor.id, fullUrl(other.id), { method: "DELETE" });

            expect(status).toEqual(403);
        });
    })
});

