import * as faker from "faker";
import { pages, categories, responses, users, questions, answers } from "../../src/database/database";
import { randomUser, setupAnswers, setupPages, setupQuestions } from "../database/databaseTestUtils";
import { randomPage } from "../api/apiTestUtils";
import { deletePage } from "../../src/fetchers";


describe("Database interface for pages", () => {

    it("Can create page", async () => {

        const owner = await users.createUser(randomUser())

        const id = faker.random.uuid();
        const page = {
            owner_id: owner.id,
            name: "Amazing cafe!",
            id: id,
            category_id: null
        };

        const before = await pages.getPage(id);
        await pages.createPage(page);
        const after = await pages.getPage(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy;
    });

    it("Can update page", async () => {

        const originalName = faker.company.companyName();
        const updatedName = faker.company.companyName();

        const owner = await users.createUser(randomUser())

        const page = {
            owner_id: owner.id,
            name: originalName,
            id: faker.random.uuid(),
            category_id: null
        }

        await pages.createPage(page);

        expect(originalName).not.toEqual(updatedName);
        expect(page.name).toEqual(originalName);

        page.name = updatedName;
        await pages.updatePage(page);

        const after = await pages.getPage(page.id);

        expect(after.name).toEqual(updatedName);
    });

    it("Can delete pages", async () => {


        const owner = await users.createUser(randomUser())
        const page = await pages.createPage(randomPage(owner.id))
        const retrievedBefore = await pages.getPage(page.id);
        expect(retrievedBefore.name).toEqual(page.name);

        await pages.deletePage(page.id);

        const retrievedAfter = await pages.getPage(page.id);
        expect(retrievedAfter).toBeNull();
    });

    it("Deletes responses along with page", async () => {

        const owner = await users.createUser(randomUser())
        const page = await pages.createPage(randomPage(owner.id));

        await responses.createResponse({
            emotion: ":-(",
            page_id: page.id
        });



        const responsesBefore = await responses.getResponses(page.id);
        expect(responsesBefore.length).toEqual(1);

        await pages.deletePage(page.id);

        const responsesAfter = await responses.getResponses(page.id);
        expect(responsesAfter.length).toEqual(0);
    });

    it("Deletes questions along with page", async () => {

        const [_, page, [firstBefore, secondBefore]] = await setupQuestions(2);

        await pages.deletePage(page.id);

        const firstAfter = await questions.getQuestion(firstBefore.id);
        const secondAfter = await questions.getQuestion(secondBefore.id);

        expect(firstBefore).toBeDefined();
        expect(secondBefore).toBeDefined();

        expect(firstAfter).toBeNull();
        expect(secondAfter).toBeNull();
    });


    it("Deletes only questions relevant to the page", async () => {

        const [_, page, [question]] = await setupQuestions(1);
        const [__, ___, [otherQuestion]] = await setupQuestions(1);

        await pages.deletePage(page.id);

        const questionAfter = await questions.getQuestion(question.id);
        const otherAfter = await questions.getQuestion(otherQuestion.id);

        expect(questionAfter).toBeNull();
        expect(otherAfter).toEqual(otherQuestion);
    });

    it("Deletes answers along with page", async () => {

        const [_, page, response, [answer]] = await setupAnswers(1);

        await pages.deletePage(page.id);
        const after = await answers.getAnswer(answer.id);
        expect(after).toBeNull();
    });

    it("Only deletes relevant answers", async () => {

        const [_, __, ___, [unrelated]] = await setupAnswers(1);
        const [____, page, _____, [answer]] = await setupAnswers(1);

        await pages.deletePage(page.id);

        const unrelatedAfter = await answers.getAnswer(unrelated.id);
        const answerAfter = await answers.getAnswer(answer.id);

        expect(unrelatedAfter).toEqual(unrelated);
        expect(answerAfter).toEqual(null);
    });

    it("Can set category", async () => {

        const user = await users.createUser(randomUser())
        const persistedCategory = await categories.createCategory({ name: "category name", owner_id: user.id });

        const page = {
            owner_id: user.id,
            name: "page name",
            id: faker.random.uuid(),
            category_id: persistedCategory.id
        }

        await pages.createPage(page);

        const retrievedPage = await pages.getPage(page.id);
        expect(retrievedPage.category_id).toEqual(persistedCategory.id);
    });


    describe("Getting pages by owner and category", () => {

        it("Can returns pages", async () => {

            const owner = await users.createUser(randomUser())
            const category = await categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: owner.id
            });

            const persisted = [];
            for (let i = 0; i < 4; i++) {

                const page = await pages.createPage(randomPage(owner.id, "#aabbcc", category.id));
                persisted.push(page);
            }

            const retrieved = await pages.getByOwnerAndCategory(owner.id, category.id);
            expect(retrieved).toEqual(persisted);
        });


        it("Does not return pages with other owners or categories", async () => {

            const owner = await users.createUser(randomUser())
            const other = await users.createUser(randomUser())
            const ownerCategory = await categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: owner.id
            });
            const otherCategory = await categories.createCategory({
                name: faker.commerce.productName(),
                owner_id: other.id
            });

            const ownerPage = await pages.createPage(randomPage(owner.id, "#aabbcc", ownerCategory.id));
            const otherPage = await pages.createPage(randomPage(other.id, "#aabbcc", otherCategory.id));

            const retrieved = await pages.getByOwnerAndCategory(owner.id, ownerCategory.id);

            expect(retrieved.length).toEqual(1);
            expect(retrieved[0]).toEqual(ownerPage);
            expect(retrieved[0]).not.toEqual(otherPage);
        });
    });
    describe("The 'color'-column", () => {

        it("Does exist", async () => {

            const color = '#AABBCC';
            const owner = await users.createUser(randomUser())
            const page = await pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Does not have to be specified", async () => {

            const color = null;
            const owner = await users.createUser(randomUser())
            const page = await pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Has constraints on char count", async () => {

            const sixChars = '#AABBC';
            const eightChars = '#AABBCCC';
            const owner = await users.createUser(randomUser())

            await expect(async () => {

                await pages.createPage(randomPage(owner.id, sixChars));
                await pages.createPage(randomPage(owner.id, eightChars));
            }).rejects.toThrow();
        });

        it("Can be updated", async () => {

            const owner = await users.createUser(randomUser())
            const originalColor = '#AABBCC';

            const page = await pages.createPage(randomPage(owner.id, originalColor))
            expect(page.color).toEqual(originalColor);

            const newColor = '#CCBBAA';
            const updated = await pages.updatePage(
                { ...page, color: newColor }
            );

            expect(updated.color).toEqual(newColor);
            expect(updated.color).not.toEqual(page.color);
        });

        it("Can check wether a page exists or not", async () => {

            const owner = await users.createUser(randomUser());
            const page = randomPage(owner.id); //NOTE: not persisted 

            const before = await pages.pageExists(page.id);
            await pages.createPage(page)
            const after = await pages.pageExists(page.id);

            expect(before).toEqual(false);
            expect(after).toEqual(true);
        });
    });

    describe("Pagination behaviour of pages", () => {

        it("Default return limit is 15", async () => {

            const pageSize = 15;
            const amountPersisted = pageSize + 5;

            const [owner, persisted] = await setupPages(amountPersisted);
            const retrieved = await pages.getByOwner(owner.id);

            expect(pageSize).toBeLessThan(amountPersisted);
            expect(retrieved.length).toEqual(pageSize);
            expect(persisted.length).toEqual(amountPersisted);
        });

        it("Returns pages ordered by creation date", async () => {

            const [owner] = await setupPages(3);
            const [first, second, third] = (await pages.getByOwner(owner.id))
                .map(page => new Date(page.created_at).getTime());

            expect(first).toBeGreaterThan(second);
            expect(second).toBeGreaterThan(third);
        });

        it("Only returns pages created after given 'key'-date", async () => {

            const [owner, [first, second, third]] = await setupPages(3);

            const retrieved = (await pages.getByOwner(owner.id, {
                amount: 15,
                key: first.created_at
            })).map(page => page.id);

            expect(retrieved).not.toContain(first.id); //not returned, as equal to key
            expect(retrieved).toContain(second.id); // returned, as after key
            expect(retrieved).toContain(third.id); // returned, as after key
        });

        it("Contraints both by page size and key", async () => {


            const [owner, [first, second, third, fourth]] = await setupPages(4);
            const retrieved = (await pages.getByOwner(owner.id, {
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

            const updated = await pages.updatePage({
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

        it("Returns a number", async () => {

            const [owner] = await setupPages();

            const count = await pages.getPageCountByOwner(owner.id);
            expect(typeof (count)).toEqual("number");
        });

        it("Returns the same amount as persisted", async () => {

            const [owner, persisted] = await setupPages();
            const count = await pages.getPageCountByOwner(owner.id);

            expect(count).toEqual(persisted.length);
        });

        it("Only counts those by relevant owner", async () => {


            const [first, pagesOfFirst] = await setupPages();
            const [second, pagesOfSecond] = await setupPages();

            const firstCount = await pages.getPageCountByOwner(first.id);
            const secondCOund = await pages.getPageCountByOwner(second.id);

            expect(firstCount).toEqual(pagesOfFirst.length);
            expect(secondCOund).toEqual(pagesOfSecond.length);
        });
    });

    describe("Getting customer id and amount of pages", async () => {

        it("does not throw", async () => {

            const [owner, persisted] = await setupPages();

            expect(pages.getCustomerToPage())
                .resolves.not.toThrow()
        });

        it("Returns something an array of { customer_id, count } ", async () => {

            //NOTE: in practice this is not needed as there will always be something from the other tests
            await setupPages();

            const [firstElement] = (await pages.getCustomerToPage()) as any[]
            expect(firstElement.customer_id).toBeDefined();
            expect(firstElement.count).toBeDefined();
        });


        const random = <T>(array: T[]) =>
            array[Math.floor(Math.random() * array.length + 1)];

        it("Returns the actual page count of a user", async () => {

            await setupPages();

            const { customer_id, count } = random(
                (await pages.getCustomerToPage())
            )

            const user = await users.getUserByCustomerId(customer_id);
            const ownedByUser = await pages.getByOwner(user.id);

            expect(ownedByUser.length).toEqual(parseInt(count));
        });

        it("Returns a row for every registered customer :D", async () => {

            await setupPages();

            const rows = await pages.getCustomerToPage();
            const countRegistered = await users.getUserCount();

            //FIXME: could this be because users without pages are ignored? 
            expect(rows.length).toEqual(parseInt(countRegistered));
        });
    });
});