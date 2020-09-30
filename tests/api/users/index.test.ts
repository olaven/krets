import fetch from "cross-fetch";
import { users } from "../../../src/database/database"
import { randomUser } from "../../database/databaseTestUtils";
import { setupServer, teardownServer, authenticatedFetch } from "../apiTestUtils";
import userHandler from "../../../src/pages/api/users/[id]";
import { UserModel } from "../../../src/models/models";
import { mockFetch } from "../../frontend/frontendTestUtils";
import { createAdmin, createBasicUser } from "./userTestUtils";



jest.mock("../../../src/auth/auth0");
jest.mock("../../../src/payment/stripe");
jest.mock("request")

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

        it(" Does not respond to methods other than GET", async () => {

            for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]) {

                const user = await createBasicUser()
                const { status } = await authenticatedFetch(user.id, url, { method });
                expect(status).toEqual(405);
            }
        });
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

        it("Does _not_ return 403 if user is admin", async () => {

            const user = await createAdmin();
            const { status } = await authenticatedFetch(user.id, url);

            expect(user.role).toEqual("administrator");
            expect(status).not.toEqual(403);
        });

        it("Returns status code 200 if user is admin", async () => {

            const user = await createAdmin();
            const { status } = await authenticatedFetch(user.id, url);
            expect(status).toEqual(200);
        });
    });
});

