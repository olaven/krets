import * as faker from "faker";
import { database } from "../../src/database/database";
import { randomUser, setupAnswers, setupEmbeddable, setupPage, setupPages, setupQuestions } from "../database/databaseTestUtils";
import { randomPage } from "../api/apiTestUtils";


describe("Database interface for pages", () => {

    it("Can create page", async () => {

        const owner = await database.users.createUser(randomUser())

        const id = faker.random.uuid();
        const page = {
            owner_id: owner.id,
            name: "Amazing cafe!",
            id: id,
            category_id: null,
            mandatory_contact_details: false,
        };

        const before = await database.pages.getPage(id);
        await database.pages.createPage(page);
        const after = await database.pages.getPage(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy;
    });

    it("Can update page", async () => {

        const originalName = faker.company.companyName();
        const updatedName = faker.company.companyName();

        const owner = await database.users.createUser(randomUser())

        const page = {
            owner_id: owner.id,
            name: originalName,
            id: faker.random.uuid(),
            category_id: null,
            mandatory_contact_details: false,
        }

        await database.pages.createPage(page);

        expect(originalName).not.toEqual(updatedName);
        expect(page.name).toEqual(originalName);

        page.name = updatedName;
        await database.pages.updatePage(page);

        const after = await database.pages.getPage(page.id);

        expect(after.name).toEqual(updatedName);
    });

    it("Can delete pages", async () => {


        const owner = await database.users.createUser(randomUser())
        const page = await database.pages.createPage(randomPage(owner.id))
        const retrievedBefore = await database.pages.getPage(page.id);
        expect(retrievedBefore.name).toEqual(page.name);

        await database.pages.deletePage(page.id);

        const retrievedAfter = await database.pages.getPage(page.id);
        expect(retrievedAfter).toBeNull();
    });

    it("Deletes responses along with page", async () => {

        const owner = await database.users.createUser(randomUser())
        const page = await database.pages.createPage(randomPage(owner.id));

        await database.responses.createResponse({
            emotion: ":-(",
            page_id: page.id
        });



        const responsesBefore = await database.responses.getResponses(page.id);
        expect(responsesBefore.length).toEqual(1);

        await database.pages.deletePage(page.id);

        const responsesAfter = await database.responses.getResponses(page.id);
        expect(responsesAfter.length).toEqual(0);
    });

    it("Deletes questions along with page", async () => {

        const [_, page, [firstBefore, secondBefore]] = await setupQuestions(2);

        await database.pages.deletePage(page.id);

        const firstAfter = await database.questions.getQuestion(firstBefore.id);
        const secondAfter = await database.questions.getQuestion(secondBefore.id);

        expect(firstBefore).toBeDefined();
        expect(secondBefore).toBeDefined();

        expect(firstAfter).toBeNull();
        expect(secondAfter).toBeNull();
    });


    it("Deletes only questions relevant to the page", async () => {

        const [_, page, [question]] = await setupQuestions(1);
        const [__, ___, [otherQuestion]] = await setupQuestions(1);

        await database.pages.deletePage(page.id);

        const questionAfter = await database.questions.getQuestion(question.id);
        const otherAfter = await database.questions.getQuestion(otherQuestion.id);

        expect(questionAfter).toBeNull();
        expect(otherAfter).toEqual(otherQuestion);
    });

    it("Deletes answers along with page", async () => {

        const [_, page, response, [answer]] = await setupAnswers(1);

        await database.pages.deletePage(page.id);
        const after = await database.answers.getAnswer(answer.id);
        expect(after).toBeNull();
    });

    it("Only deletes relevant answers", async () => {

        const [_, __, ___, [unrelated]] = await setupAnswers(1);
        const [____, page, _____, [answer]] = await setupAnswers(1);

        await database.pages.deletePage(page.id);

        const unrelatedAfter = await database.answers.getAnswer(unrelated.id);
        const answerAfter = await database.answers.getAnswer(answer.id);

        expect(unrelatedAfter).toEqual(unrelated);
        expect(answerAfter).toEqual(null);
    });

    it("Deletes embeddables along with page", async () => {

        const [user, page, embeddable] = await setupEmbeddable();

        const before = await database.embeddables.getByPage(page.id);
        await database.pages.deletePage(page.id);
        const after = await database.embeddables.getByPage(page.id);

        expect(before).toBeDefined();
        expect(before.id).toEqual(embeddable.id);
        expect(after).toBeNull();
    });



    it("_Only_ deletes relevant embeddables", async () => {

        const [_, page, embeddable] = await setupEmbeddable();
        const [__, otherPage, ___] = await setupEmbeddable();

        const before = await database.embeddables.getByPage(page.id);
        await database.pages.deletePage(otherPage.id);
        const after = await database.embeddables.getByPage(page.id);

        expect(before).toBeDefined();
        expect(before.id).toEqual(embeddable.id);

        //NOTE: i.e. no change
        expect(after).toBeDefined();
        expect(after.id).toEqual(embeddable.id);
    });


    it("Can set category", async () => {

        const user = await database.users.createUser(randomUser())
        const persistedCategory = await database.categories.createCategory({ name: "category name", owner_id: user.id });

        const page = {
            owner_id: user.id,
            name: "page name",
            id: faker.random.uuid(),
            category_id: persistedCategory.id,
            mandatory_contact_details: false
        }

        await database.pages.createPage(page);

        const retrievedPage = await database.pages.getPage(page.id);
        expect(retrievedPage.category_id).toEqual(persistedCategory.id);
    });


    describe("Getting pages by owner and category", () => {

        it("Can returns pages", async () => {

            const owner = await database.users.createUser(randomUser())
            const category = await database.categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: owner.id
            });

            const persisted = [];
            for (let i = 0; i < 4; i++) {

                const page = await database.pages.createPage(randomPage(owner.id, "#aabbcc", category.id));
                persisted.push(page);
            }

            const retrieved = await database.pages.getByOwnerAndCategory(owner.id, category.id);
            expect(retrieved).toEqual(persisted);
        });


        it("Does not return pages with other owners or categories", async () => {

            const owner = await database.users.createUser(randomUser())
            const other = await database.users.createUser(randomUser())
            const ownerCategory = await database.categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: owner.id
            });
            const otherCategory = await database.categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: other.id
            });

            const ownerPage = await database.pages.createPage(randomPage(owner.id, "#aabbcc", ownerCategory.id));
            const otherPage = await database.pages.createPage(randomPage(other.id, "#aabbcc", otherCategory.id));

            const retrieved = await database.pages.getByOwnerAndCategory(owner.id, ownerCategory.id);

            expect(retrieved.length).toEqual(1);
            expect(retrieved[0]).toEqual(ownerPage);
            expect(retrieved[0]).not.toEqual(otherPage);
        });
    });

    describe("The 'mandatory'-column", () => {

        it("Does exist", async () => {

            const [_, page] = await setupPage();
            expect(page.mandatory_contact_details).toBeDefined();
        });

        it("Is false by default", async () => {

            const [_, page] = await setupPage();
            expect(page.mandatory_contact_details).toBe(false);
        });

        it("Can be updated", async () => {

            const [_, original] = await setupPage();
            const updated = await database.pages.updatePage({
                ...original,
                mandatory_contact_details: true
            });

            expect(original.mandatory_contact_details).toBe(false);
            expect(updated.mandatory_contact_details).toBe(true);
        });

        it("Can be set to its current state without crashing", async () => {

            const [_, before] = await setupPage();
            const after = await database.pages.updatePage({
                ...before, mandatory_contact_details: before.mandatory_contact_details
            });

            expect(before.mandatory_contact_details).toEqual(after.mandatory_contact_details);
        });

        it("Can be changed multiple times, back and forth", async () => {

            const [_, first] = await setupPage();

            const second = await database.pages.updatePage({
                ...first,
                mandatory_contact_details: !first.mandatory_contact_details
            });

            const third = await database.pages.updatePage({
                ...second,
                mandatory_contact_details: !second.mandatory_contact_details
            });

            const fourth = await database.pages.updatePage({
                ...third,
                mandatory_contact_details: !third.mandatory_contact_details
            });

            expect(first.mandatory_contact_details).toBe(false);
            expect(second.mandatory_contact_details).toBe(true);
            expect(third.mandatory_contact_details).toBe(false);
            expect(fourth.mandatory_contact_details).toBe(true);
        });
    });

    describe("The 'color'-column", () => {

        it("Does exist", async () => {

            const color = '#AABBCC';
            const owner = await database.users.createUser(randomUser())
            const page = await database.pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Does not have to be specified", async () => {

            const color = null;
            const owner = await database.users.createUser(randomUser())
            const page = await database.pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Has constraints on char count", async () => {

            const sixChars = '#AABBC';
            const eightChars = '#AABBCCC';
            const owner = await database.users.createUser(randomUser())

            await expect(async () => {

                await database.pages.createPage(randomPage(owner.id, sixChars));
                await database.pages.createPage(randomPage(owner.id, eightChars));
            }).rejects.toThrow();
        });

        it("Can be updated", async () => {

            const owner = await database.users.createUser(randomUser())
            const originalColor = '#AABBCC';

            const page = await database.pages.createPage(randomPage(owner.id, originalColor))
            expect(page.color).toEqual(originalColor);

            const newColor = '#CCBBAA';
            const updated = await database.pages.updatePage(
                { ...page, color: newColor }
            );

            expect(updated.color).toEqual(newColor);
            expect(updated.color).not.toEqual(page.color);
        });

        it("Can check wether a page exists or not", async () => {

            const owner = await database.users.createUser(randomUser());
            const page = randomPage(owner.id); //NOTE: not persisted 

            const before = await database.pages.pageExists(page.id);
            await database.pages.createPage(page)
            const after = await database.pages.pageExists(page.id);

            expect(before).toEqual(false);
            expect(after).toEqual(true);
        });
    });

    describe("Pagination behaviour of pages", () => {

        it("Default return limit is 15", async () => {

            const pageSize = 15;
            const amountPersisted = pageSize + 5;

            const [owner, persisted] = await setupPages(amountPersisted);
            const retrieved = await database.pages.getByOwner(owner.id);

            expect(pageSize).toBeLessThan(amountPersisted);
            expect(retrieved.length).toEqual(pageSize);
            expect(persisted.length).toEqual(amountPersisted);
        });

        it("Returns pages ordered by creation date", async () => {

            const [owner] = await setupPages(3);
            const [first, second, third] = (await database.pages.getByOwner(owner.id))
                .map(page => new Date(page.created_at).getTime());

            expect(first).toBeGreaterThan(second);
            expect(second).toBeGreaterThan(third);
        });

        it("Only returns pages created after given 'key'-date", async () => {

            const [owner, [first, second, third]] = await setupPages(3);

            const retrieved = (await database.pages.getByOwner(owner.id, {
                amount: 15,
                key: first.created_at
            })).map(page => page.id);

            expect(retrieved).not.toContain(first.id); //not returned, as equal to key
            expect(retrieved).toContain(second.id); // returned, as after key
            expect(retrieved).toContain(third.id); // returned, as after key
        });

        it("Contraints both by page size and key", async () => {


            const [owner, [first, second, third, fourth]] = await setupPages(4);
            const retrieved = (await database.pages.getByOwner(owner.id, {
                amount: 1,
                key: second.created_at
            })).map(page => page.id);

            expect(retrieved).not.toContain(first.id); // as before key
            expect(retrieved).not.toContain(second.id); // as equal to key 
            expect(retrieved).toContain(third.id); // as after key and before amount-limit
            expect(retrieved).not.toContain(fourth.id); // as after amount-limit
        });

        it("Is possible to create a custom title", async () => {

            const [_, [original]] = await setupPages(1);
            const NEW_TITLE = faker.random.words(10);

            const updated = await database.pages.updatePage({
                ...original,
                custom_title: NEW_TITLE
            });

            expect(NEW_TITLE).not.toEqual(original.custom_title);
            expect(updated.custom_title).toEqual(NEW_TITLE);
            expect(updated.id).toEqual(original.id);
            expect(updated.name).toEqual(original.name);
        });
    });

    describe("The function for returning the amount of pages owned by a given user", () => {

        describe("Getting customer id and amount of pages", () => {

            it("does not throw", async () => {

                expect(database.pages.getCustomerToPageCount())
                    .resolves.not.toThrow()
            });

            it.skip("Returns something an array of { customer_id, count }", async () => {

                //NOTE: in practice this is not needed as there will always be something from the other tests
                await setupPages(4, true);

                const element = random((await database.pages.getCustomerToPageCount()) as any[])

                expect(element).toBeDefined()
                expect(element.customer_id).toBeDefined();
                expect(element.count).toBeDefined();
            });


            const random = <T>(array: T[]) =>
                array[Math.floor(Math.random() * array.length + 1)];


            it("Returns a row for every active user", async () => {

                await setupPages();

                const rows = await database.pages.getCustomerToPageCount();
                const countRegistered = await database.users.getActiveUserCount();

                expect(rows.length).toEqual(countRegistered);
            });

            it("Actually returns a valid number of pages", async () => {

                await setupPages();

                const rows = await database.pages.getCustomerToPageCount();

                for (const { count } of rows) {

                    expect(parseInt(count)).not.toBeNaN();
                }
            });

            it("Does not include inactive users", async () => {

                const [user] = await setupPages();
                await database.users.updateUser({
                    ...user,
                    active: false
                });

                const rows = await database.pages.getCustomerToPageCount()
                const found = rows.find(({ id }) => id === user.id);
                expect(found).toBeFalsy();
            });

            it("Does include active users", async () => {

                const [user] = await setupPages();
                await database.users.updateUser({
                    ...user,
                    active: true
                });

                const rows = await database.pages.getCustomerToPageCount()
                const found = rows.find(({ id }) => id === user.id);
                expect(found).toBeTruthy();
            });
        });
    })
}); 