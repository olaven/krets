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
    })
});
;