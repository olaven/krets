import { users } from "../../src/database/database";
import * as faker from "faker";
import { randomUser } from "./databaseTestUtils";
import { uid } from "../api/apiTestUtils";

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

    test("Can update customer id", async () => {

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

    test("Can update payment information", async () => {

        const NEW_PRODUCT_ID = uid();
        const NEW_SUBSCRIPTION_ID = uid();

        const original = await users.createUser(randomUser());
        const updated = await users.updatePaymentInformation(original.id, NEW_PRODUCT_ID, NEW_SUBSCRIPTION_ID);

        expect(updated.id).toEqual(original.id);
        expect(updated.product_id).not.toEqual(original.product_id);
        expect(updated.subscription_id).not.toEqual(original.subscription_id);
        expect(updated.product_id).toEqual(NEW_PRODUCT_ID);
        expect(updated.subscription_id).toEqual(NEW_SUBSCRIPTION_ID);
    });
});
