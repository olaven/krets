import {describe} from "@jest/globals";
import {pages} from "../../src/database/pages";
import * as faker from "faker";
import {users} from "../../src/database/users";

describe("Database endpoint for pages", () => {

    test("Can create page", async () => {

        const owner = {
            id: faker.random.uuid()
        };

        await users.createUser(owner);

        const id = faker.random.uuid();
        const page = {
            owner_id: owner.id,
            name: "Amazing cafe!",
            id: id
        };

        const before = await pages.getPage(id);
        await pages.createPage(page);
        const after = await pages.getPage(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy;
    })
});