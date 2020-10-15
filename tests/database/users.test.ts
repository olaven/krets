import { database } from "../../src/database/database";
import * as faker from "faker";
import { randomUser, setupEmbeddable, setupPages, setupQuestions, setupUsers } from "./databaseTestUtils";


describe("User repository", () => {

    test("Can get user", async () => {

        const persisted = await database.users.createUser(randomUser());
        const user = await database.users.getUser(persisted.id);
        expect(user).toBeDefined();
    });


    test("id of user has to be unique", async () => {

        const user = randomUser();
        await expect(database.users.createUser(user)).resolves.toBeTruthy();
        await expect(database.users.createUser(user)).rejects.toBeTruthy();
    });


    test("can check wether user is present or not", async () => {

        const id = faker.random.uuid();

        const before = await database.users.userExists(id);
        await database.users.createUser(randomUser(id));
        const after = await database.users.userExists(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy();
    });

    test(" User has prop for wether it is active or not", async () => {

        const user = await database.users.createUser(randomUser());
        expect(user.active).toBeDefined();
    });

    test(" `.active` is a boolean", async () => {

        const user = await database.users.createUser(randomUser());
        expect(typeof user.active).toEqual("boolean");
    });

    test("user has a `role`", async () => {

        const user = await database.users.createUser(randomUser());
        expect(user.role).toBeDefined();
    });

    test("A role is 'basic' by default", async () => {

        const user = await database.users.createUser(randomUser());
        expect(user.role).toEqual("basic");
    });

    test("A role _can not_ be udpated with regular update function", async () => {

        const original = await database.users.createUser(randomUser());
        const updated = await database.users.updateUser({
            ...original,
            role: 'administrator'
        });

        expect(original.role).toEqual("basic");
        expect(updated.role).toEqual("basic");
    });

    test(" A role can be updated with specific `updateRole`-function", async () => {

        const original = await database.users.createUser(randomUser());
        const updated = await database.users.updateRole({
            ...original,
            role: "administrator"
        });

        expect(original.role).toEqual("basic");
        expect(updated.role).toEqual("administrator");
    });

    test(" `updateRole` updates only role", async () => {

        const original = await database.users.createUser(randomUser());
        const updated = await database.users.updateRole({
            ...original,
            active: !original.active, //NOTE updating something other than `role`
        });

        expect(updated.role).not.toEqual(!original.active);
        expect(updated.role).toEqual(original.role);
    });

    test(" valid `UserRole`-values are accepted", async () => {

        const original = await database.users.createUser(randomUser());
        expect(database.users.updateRole({
            ...original,
            role: "administrator"
        })).resolves.not.toThrow();

        expect(database.users.updateRole({
            ...original,
            role: "basic"
        })).resolves.not.toThrow();
    });

    test("non-`UserRole`-values are _not_ accepted", async () => {

        const original = await database.users.createUser(randomUser());
        expect(database.users.updateRole({
            ...original,
            //@ts-expect-error
            role: "_not_valid_first"
        })).rejects.toThrow();

        expect(database.users.updateRole({
            ...original,
            //@ts-expect-error
            role: "_not_valid_second"
        })).rejects.toThrow();
    });

    test("Can update user `active` status through `updateUser`", async () => {

        const original = await database.users.createUser(randomUser());
        const updated = await database.users.updateUser({
            ...original,
            active: !original.active
        });

        expect(original.active).not.toEqual(updated.active);
        expect(updated.active).toEqual(!original.active);
    });

    test("Can delete user after creation", async () => {

        const before = await database.users.createUser(randomUser());
        await database.users.deleteUser(before.id);
        const after = await database.users.getUser(before.id);

        expect(before).toBeDefined();
        expect(after).toBeNull();
    });

    test("Deleting a user ownly deletes that single user", async () => {

        const user = await database.users.createUser(randomUser());
        const other = await database.users.createUser(randomUser());

        await database.users.deleteUser(user.id);

        const userAfter = await database.users.getUser(user.id);
        const otherAfter = await database.users.getUser(other.id);

        expect(userAfter).toBeNull();
        expect(otherAfter).toEqual(other);
    });

    test("Deleting a user also deletes the pages", async () => {

        const [user, ownedPages] = await setupPages(1);
        const before = await database.pages.getByOwner(user.id);

        await database.users.deleteUser(user.id);

        const after = await database.pages.getByOwner(user.id);

        expect(before).toEqual(ownedPages);
        expect(before).not.toEqual(after);
        expect(after).toEqual([]);
    });

    test("Deleting a user does _not_ delete other pages", async () => {

        const [user, _] = await setupPages();
        const [otherUser, otherPages] = await setupPages();

        const before = await database.pages.getByOwner(otherUser.id);
        await database.users.deleteUser(user.id);
        const after = await database.pages.getByOwner(otherUser.id);

        expect(before).toEqual(otherPages);
        expect(before).toEqual(after);
    });

    test("Deleting a user also deletes relevant questions", async () => {

        const [user, page, persisted] = await setupQuestions(2);
        const before = await database.questions.getNonArchivedByPage(page.id);

        await database.users.deleteUser(user.id);

        const after = await database.questions.getNonArchivedByPage(page.id);

        expect(before).toEqual(persisted);
        expect(after).not.toEqual(before);
        expect(after).toEqual([]);
    });

    test("Deleting a user does _not_ delete irrelevant questions", async () => {

        const [_, otherPage, otherQuestions] = await setupQuestions();
        const [user] = await setupQuestions(2);

        const before = await database.questions.getNonArchivedByPage(otherPage.id);

        await database.users.deleteUser(user.id);

        const after = await database.questions.getNonArchivedByPage(otherPage.id);

        expect(before).toEqual(otherQuestions);
        expect(before).toEqual(after);
        expect(after).not.toEqual([]);
    });

    test("Deleting a user also deletes relevant embeddables", async () => {

        const [user, page, embeddable] = await setupEmbeddable()

        const before = await database.embeddables.getByPage(page.id);
        await database.users.deleteUser(user.id);
        const after = await database.embeddables.getByPage(page.id);

        expect(before).toBeDefined();
        expect(after).toBeNull();
    });


    describe("Pagination behaviour of users", () => {

        it("Default return limit is 10", async () => {

            const pageSize = 10;
            const amountPersisted = pageSize + 5;

            const persisted = await setupUsers(amountPersisted);
            const retrieved = await database.users.getAllUsers();

            expect(pageSize).toBeLessThan(amountPersisted);
            expect(persisted.length).toEqual(amountPersisted);
            expect(retrieved.length).toEqual(pageSize);
        });

        it(" Returns pages ordered by creation date", async () => {

            await setupUsers(3)
            const [first, second, third] = (await database.users.getAllUsers())
                .map(user => new Date(user.created_at).getTime());

            expect(first).toBeGreaterThan(second);
            expect(second).toBeGreaterThan(third);
        });

        //does not work, as tests create more users in parallell - TODO: should ideally clear database between all tests
        it.skip(" Only returns pages created after given 'key'-date", async () => {

            const [first, second, third] = await setupUsers(3);

            expect(first.created_at).toBeDefined();
            const retrieved = (await database.users.getAllUsers({
                amount: 10,
                key: first.created_at
            })).map(user => user.id);

            expect(retrieved).not.toContain(first.id); //not returned, as equal to key
            expect(retrieved).toContain(second.id); // returned, as after key
            expect(retrieved).toContain(third.id); // returned, as after key
        });

        //does not work, as tests create more users in parallell - TODO: should ideally clear database between all tests
        it.skip(" Contraints both by page size and key", async () => {

            const [first, second, third, fourth] = await setupUsers(4);
            const retrieved = (await database.users.getAllUsers({
                amount: 1,
                key: second.created_at
            })).map(user => user.id);

            expect(retrieved).not.toContain(first.id); // as before key
            expect(retrieved).not.toContain(second.id); // as equal to key 
            expect(retrieved).toContain(third.id); // as after key and before amount-limit
            expect(retrieved).not.toContain(fourth.id); // as after amount-limit
        });
    });
});
