import { users } from "../../src/database/users";
import {expect} from "@jest/globals";
import * as faker from "faker";

describe("User repository", () => {

    test("Can get user", async () => {

        const id = faker.random.uuid();
        await users.createUser({id});
        const user = await users.getUser(id);
        expect(user).toBeDefined();
    });


    test("id of user has to be unique", async () => {

        const user = {id: faker.random.uuid()};
        await expect(users.createUser(user)).resolves.toBeTruthy();
        await expect(users.createUser(user)).rejects.toBeTruthy();
    });


    test("can check wether user is present or not", async () => {

        const id = faker.random.uuid();

        const before = await users.userExists(id);
        await users.createUser({ id });
        const after = await users.userExists(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    })
});
;