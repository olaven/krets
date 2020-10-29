import fetch from "cross-fetch";
import * as faker from "faker";
import { setupServer, teardownServer, authenticatedFetch } from "../../apiTestUtils";
import authUserHandler from "../../../../../src/pages/api/users/[id]/auth";
import { createAdmin, createBasicUser } from "../userTestUtils";
import { mockFetch } from "../../../frontend/frontendTestUtils";



jest.mock("../../../../../src/auth/auth0");
jest.mock("request");

describe("Endpoints for database user data", () => {


    let server;
    let url;

    const fullUrl = (uid) =>
        `${url}${uid}/auth`;

    beforeAll(async () => {

        //NOTE: URL does not include id - must be added in tests
        [server, url] = await setupServer(authUserHandler, "/api/users/")
    });

    afterAll(async () => {

        await teardownServer(server)
    });


    describe("security of endpoint", () => {

        const randomAuth = () => ({
            name: faker.name.firstName(),
            sub: faker.random.uuid(),
            email: faker.internet.email(),
        });

        it("Does not respond if not authenticated", async () => {

            mockFetch(randomAuth(), 200);
            const { status } = await fetch(fullUrl("some-user"));
            expect(status).toEqual(401);
        });

        it("Does not respond if user is not admin, even if is the same user", async () => {

            const user = await createBasicUser();
            const { status } = await authenticatedFetch(user.id, fullUrl(user.id));
            expect(status).toEqual(403);
        });

        it("Does not respond if user is requesting someone else", async () => {

            const user = await createBasicUser();
            const other = await createBasicUser();
            const { status } = await authenticatedFetch(user.id, fullUrl(other.id));
            expect(status).toEqual(403);
        });

        it(" Does respond if user is admin, requesting themselves", async () => {

            mockFetch(randomAuth(), 200);
            const admin = await createAdmin();
            const { status } = await authenticatedFetch(admin.id, fullUrl(admin.id));
            expect(status).toEqual(200);
        });

        it(" Does respond if user is admin, requesting someone else", async () => {

            mockFetch(randomAuth(), 200);
            const admin = await createAdmin();
            const other = await createBasicUser();
            const { status } = await authenticatedFetch(admin.id, fullUrl(other.id));
            expect(status).toEqual(200);
        });
    });
});

