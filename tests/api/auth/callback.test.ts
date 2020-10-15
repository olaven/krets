import { Server } from "net";
import handler from "../../../src/pages/api/auth/callback";
import { authenticatedFetch, setupServer, teardownServer } from "../apiTestUtils";
import * as faker from "faker";
import { database } from "../../../src/database/database";
import { randomUser } from "../../database/databaseTestUtils";

jest.mock("../../../src/auth/auth0");

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

        const before = await database.users.userExists(uid);
        await authenticatedFetch(uid, url);
        const after = await database.users.userExists(uid);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    });

    it(" does _not_ create if user already exists", async () => {


        const user = await database.users.createUser(randomUser());

        const before = await database.users.userExists(user.id);
        await authenticatedFetch(user.id, url);
        const after = await database.users.userExists(user.id);

        expect(before).toBeTruthy();
        expect(after).toBeTruthy();
    });
});