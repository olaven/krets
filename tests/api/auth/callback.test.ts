import { Server } from "net";
import handler from "../../../src/pages/api/auth/callback";
import { authenticatedFetch, setupServer, teardownServer } from "../apiTestUtils";
import * as faker from "faker";
import { users } from "../../../src/database/database";
import { randomUser } from "../../database/databaseTestUtils";

jest.mock("../../../src/auth/auth0");
jest.mock("../../../src/payment/stripe");

describe("The callback endpoint", () => {

    let server: Server;
    let url: string;


    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/auth/callback");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("does create user if the user is new", async () => {

        const uid = faker.random.uuid();

        const before = await users.userExists(uid);
        await authenticatedFetch(uid, url);
        const after = await users.userExists(uid);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    });

    it("does _not_ create if user already exists", async () => {


        const user = await users.createUser(randomUser());

        const before = await users.userExists(user.id);
        await authenticatedFetch(user.id, url);
        const after = await users.userExists(user.id);

        expect(before).toBeTruthy();
        expect(after).toBeTruthy();
    });

    it("Does create a Customer ID", async () => {


        const uid = faker.random.uuid();
        await authenticatedFetch(uid, url);
        const user = await users.getUser(uid);

        expect(user).toBeTruthy();
        expect(user.id).toEqual(uid);
        expect(user.customer_id).toBeDefined();
        expect(user.customer_id).not.toEqual("default_customer_id");
    });

    //NOTE: `customer_id` was introduced after users were added to production system. 
    // this tests a "on-demand migration"
    it("Does create a new customer ID if not already created", async () => {

        const default_customer_id = "default_customer_id";

        const before = await users.createUser({
            id: faker.random.uuid(),
            customer_id: default_customer_id
        });

        await authenticatedFetch(before.id, url)

        const after = await users.getUser(before.id);

        expect(before.customer_id).toEqual(default_customer_id);
        expect(after.customer_id).not.toEqual(default_customer_id);
    });
});