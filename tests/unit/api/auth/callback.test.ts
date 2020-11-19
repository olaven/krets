import { Server } from "net";
import handler from "../../../../src/pages/api/auth/callback";
import { authenticatedFetch, setupServer, teardownServer } from "../apiTestUtils";
import * as faker from "faker";
import { database } from "../../../../src/database/database";
import { randomUser } from "../../database/databaseTestUtils";
import { validateEmail } from "../../../../src/helpers/email";
import users from "../../../../src/pages/api/users";

jest.mock("../../../../src/auth/auth0");

describe("The callback endpoint", () => {

    let server: Server;
    let url: string;


    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/auth/callback");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it(" does create user if the user is new", async () => {

        const uid = faker.random.uuid();

        const before = await database.users.exists(uid);
        await authenticatedFetch(uid, url);
        const after = await database.users.exists(uid);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    });

    it(" does _not_ create if user already exists", async () => {


        const user = await database.users.create(randomUser());

        const before = await database.users.exists(user.id);
        await authenticatedFetch(user.id, url);
        const after = await database.users.exists(user.id);

        expect(before).toBeTruthy();
        expect(after).toBeTruthy();
    });

    it("Does set `contact_email` to default something", async () => {

        const before = await database.users.create(randomUser());
        await authenticatedFetch(before.id, url);
        const after = await database.users.get(before.id);

        expect(before.contact_email).toBeFalsy();
        expect(after.contact_email).toBeTruthy();
    });

    it("Does set contact_email on completely new user", async () => {

        //NOTE: The email is set from faker.internet.email() in Auth0-mock
        const uid = faker.random.uuid();
        await authenticatedFetch(uid, url);
        const user = await database.users.get(uid);

        expect(user.contact_email).toBeDefined()
        expect(validateEmail(user.contact_email)).toBe(true);
    });

    it("Does not replace contact email", async () => {

        const uid = faker.random.uuid();

        await authenticatedFetch(uid, url);
        const first = await database.users.get(uid);

        await authenticatedFetch(uid, url)
        const second = await database.users.get(uid);

        expect(first.contact_email).toEqual(second.contact_email);
    })
});