import { pages, questions, users } from "../../src/database/database";
import * as faker from "faker";
import { randomUser, setupPages, setupQuestions } from "./databaseTestUtils";
import { uid } from "../api/apiTestUtils";
import { random } from "faker";

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
        const updated = await users.updateUser({
            id: original.id,
            customer_id: original.customer_id,
            product_id: NEW_PRODUCT_ID,
            subscription_id: NEW_SUBSCRIPTION_ID
        });

        expect(updated.id).toEqual(original.id);

        expect(updated.product_id).not.toEqual(original.product_id);
        expect(updated.subscription_id).not.toEqual(original.subscription_id);

        expect(updated.product_id).toEqual(NEW_PRODUCT_ID);
        expect(updated.subscription_id).toEqual(NEW_SUBSCRIPTION_ID);
    });

    test("Can _not_ update invoice with regular update method", async () => {

        const original = await users.createUser(randomUser());
        expect(original.invoice_paid).toBeFalsy();

        const updated = await users.updateUser({
            ...original, invoice_paid: true //trying to set 'true'
        });
        expect(updated.invoice_paid).toBeFalsy(); //i.e. still 'false' -> no change 
    })

    test("Can update invoice paid with separate method", async () => {

        const original = await users.createUser(randomUser());
        const updated = await users.updateInvoicePaid(original.id, true);

        expect(original.invoice_paid).toBeFalsy();
        expect(updated.invoice_paid).toBeTruthy();
    })

    test("Can get user by customer id", async () => {

        const CUSTOMER_ID = uid();
        const user = await users.createUser(randomUser());

        user.customer_id = CUSTOMER_ID;
        await users.updateUser(user)

        const retrieved = await users.getUserByCustomerId(CUSTOMER_ID);
        expect(retrieved.id).toEqual(user.id);
    });

    test("Can update payment information with custom function", async () => {

        const NEW_PRODUCT_ID = uid();
        const NEW_SUBSCRIPTION_ID = uid();
        const NEW_INVOICE_PAID = true;

        const original = await users.createUser(randomUser());
        const updated = await users.updatePaymentInformation({
            id: original.id,
            product_id: NEW_PRODUCT_ID,
            subscription_id: NEW_SUBSCRIPTION_ID,
            invoice_paid: NEW_INVOICE_PAID
        });


        expect(updated.id).toEqual(original.id);

        expect(updated.product_id).not.toEqual(original.product_id);
        expect(updated.subscription_id).not.toEqual(original.subscription_id);
        expect(updated.invoice_paid).not.toEqual(original.invoice_paid);

        expect(updated.product_id).toEqual(NEW_PRODUCT_ID);
        expect(updated.subscription_id).toEqual(NEW_SUBSCRIPTION_ID);
        expect(updated.invoice_paid).toEqual(NEW_INVOICE_PAID);
    });

    test("Can delete user after creation", async () => {

        const before = await users.createUser(randomUser());
        await users.deleteUser(before.id);
        const after = await users.getUser(before.id);

        expect(before).toBeDefined();
        expect(after).toBeNull();
    });

    test("Deleting a user ownly deletes that single user", async () => {

        const user = await users.createUser(randomUser());
        const other = await users.createUser(randomUser());

        await users.deleteUser(user.id);

        const userAfter = await users.getUser(user.id);
        const otherAfter = await users.getUser(other.id);

        expect(userAfter).toBeNull();
        expect(otherAfter).toEqual(other);
    });

    test("Deleting a user also deletes the pages", async () => {

        const [user, ownedPages] = await setupPages(1);
        const before = await pages.getByOwner(user.id);

        await users.deleteUser(user.id);

        const after = await pages.getByOwner(user.id);

        expect(before).toEqual(ownedPages);
        expect(before).not.toEqual(after);
        expect(after).toEqual([]);
    });

    test("Deleting a user does _not_ delete other pages", async () => {

        const [user, _] = await setupPages();
        const [otherUser, otherPages] = await setupPages();

        const before = await pages.getByOwner(otherUser.id);
        await users.deleteUser(user.id);
        const after = await pages.getByOwner(otherUser.id);

        expect(before).toEqual(otherPages);
        expect(before).toEqual(after);
    });

    test("Deleting a user also deletes relevant questions", async () => {

        const [user, page, persisted] = await setupQuestions(2);
        const before = await questions.getByPage(page.id);

        await users.deleteUser(user.id);

        const after = await questions.getByPage(page.id);

        expect(before).toEqual(persisted);
        expect(after).not.toEqual(before);
        expect(after).toEqual([]);
    });

    test("Deleting a user does _not_ delete irrelevant questions", async () => {

        const [_, otherPage, otherQuestions] = await setupQuestions();
        const [user, __, ___] = await setupQuestions(2);

        const before = await questions.getByPage(otherPage.id);

        await users.deleteUser(user.id);

        const after = await questions.getByPage(otherPage.id);

        expect(before).toEqual(otherQuestions);
        expect(before).toEqual(after);
        expect(after).not.toEqual([]);
    });
});
