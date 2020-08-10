import { users } from "../../src/database/database";
import * as faker from "faker";
import { randomUser } from "./databaseTestUtils";

describe("User repository", () => {

    test("Can get user", async () => {

        const persisted = await users.createUser(randomUser());
        const user = await users.getUser(persisted.id);
        expect(user).toBeDefined();
    });


    test("id of user has to be unique", async () => {

        const user = randomUser();
        await expect(users.createUser(user)).resolves.toBeTruthy();
        await expect(users.createUser(user)).rejects.toBeTruthy();
    });


    test("can check wether user is present or not", async () => {

        const id = faker.random.uuid();

        const before = await users.userExists(id);
        await users.createUser(randomUser(id));
        const after = await users.userExists(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    });

    test("Can update user id", async () => {

        const original = await users.createUser(randomUser());
        const NEW_CUSTOMER_ID = faker.random.uuid();

        const updated = await users.updateUser({
            id: original.id,
            customer_id: NEW_CUSTOMER_ID
        });

        expect(updated.id).toEqual(original.id);
        expect(updated.customer_id).not.toEqual(original.customer_id);
        expect(updated.customer_id).toEqual(NEW_CUSTOMER_ID);
    });
});
