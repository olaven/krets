import fetch from "cross-fetch";
import { users } from "../../../src/database/database"
import { randomUser } from "../../database/databaseTestUtils";
import { setupServer, teardownServer, authenticatedFetch } from "../apiTestUtils";
import userHandler from "../../../src/pages/api/users/[id]";
import { UserModel } from "../../../src/models/models";
import { mockFetch } from "../../frontend/frontendTestUtils";



jest.mock("../../../src/auth/auth0");
jest.mock("../../../src/payment/stripe");
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


    const createAdmin = async () => {

        const user = await users.createUser(randomUser());
        const asAdmin = await users.updateRole({ ...user, role: "administrator" });
        return asAdmin;
    }
    const createBasicUser = async () =>
        users.createUser(randomUser());

    const putUser = (callerId: string, user: UserModel) => authenticatedFetch(callerId, fullUrl(user.id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });


    describe("The endpoint for user data from database", () => {

        mockFetch(null, 204);

        it("Only responds to GET, DELETE and PUT", async () => {

            const { id } = await users.createUser(randomUser())

            const getResponse = await authenticatedFetch(id, fullUrl(id), { method: "GET" });
            const deleteResponse = await authenticatedFetch(id, fullUrl(id), { method: "DELETE" });
            const putResponse = await authenticatedFetch(id, fullUrl(id), { method: "PUT" });

            expect(getResponse.status).toEqual(200);
            expect(deleteResponse.status).not.toEqual(405);
            expect(putResponse).not.toEqual(405);

            for (let method of ["PATCH", "HEAD", "OPTIONS"]) {

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

        it("Does not allow non-admin to access PUT endpoint", async () => {

            const user = await users.createUser(randomUser());
            const { status } = await authenticatedFetch(user.id, fullUrl(user.id), { method: "PUT" });

            expect(user.role).not.toEqual("administrator");
            expect(status).toEqual(403);
        });


        it("Does allow admin to access PUT endpoint", async () => {

            const user = await createAdmin();
            const { status } = await putUser(user.id, user);

            expect(user.role).toEqual("administrator");
            expect(status).toEqual(204);
        });

        it("Does allow admin user to update `active` of another user", async () => {

            const admin = await createAdmin();

            const before = await createBasicUser();
            const { status } = await putUser(admin.id, {
                ...before,
                active: !before.active
            });

            const after = await users.getUser(before.id);

            expect(status).toEqual(204);
            expect(before.id).toEqual(after.id);
            expect(before.active).not.toEqual(after.active);
        });

        it("Does not allow non-admin user to update `active` on themselves", async () => {



            const user = await createBasicUser();
            await putUser(user.id, {
                ...user,
                active: !user.active
            });

            const after = await users.getUser(user.id);

            expect(user.id).toEqual(after.id);
            //NOTE: i.e. no change
            expect(user.active).toEqual(after.active);
        });

        it("Does allow admin user to update `role` of another user", async () => {

            const admin = await createAdmin();

            const before = await createBasicUser();
            const { status } = await putUser(admin.id, {
                ...before,
                role: 'administrator'
            });

            const after = await users.getUser(before.id);

            expect(status).toEqual(204);
            expect(before.id).toEqual(after.id);
            expect(before.role).toEqual("basic");
            expect(after.role).toEqual("administrator");
        });


        it("Does not allow non-admin user to update `role` on themselves", async () => {



            const user = await createBasicUser();
            await putUser(user.id, {
                ...user,
                role: "administrator"
            });

            const after = await users.getUser(user.id);

            expect(user.id).toEqual(after.id);

            //NOTE: i.e. no change
            expect(user.role).toEqual("basic")
            expect(user.role).toEqual(after.role);
        });
    })
});

