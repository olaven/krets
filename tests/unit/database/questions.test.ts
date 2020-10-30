import * as faker from "faker";
import { database } from "../../../src/database/database";
import { randomPage } from "../api/apiTestUtils";
import { randomQuestion, randomUser, setupQuestions } from "./databaseTestUtils";

describe("The API interface for questions", () => {


    describe("Question creation", () => {

        it("Is possible to create questions", async () => {

            const [_, page] = await setupQuestions();
            const question = await randomQuestion(page.id);
            const persisted = await database.questions.create(question);

            expect(question.id).not.toBeDefined();
            expect(persisted.id).toBeDefined();
            expect(question.text).toEqual(persisted.text);
            expect(question.page_id).toEqual(persisted.page_id);
        });
    })

    describe("Question retrieval", () => {



        it(" Is possible to get questions by page", async () => {

            const user = await database.users.create(randomUser());

            const firstPage = await database.pages.create(randomPage(user.id));
            const secondPage = await database.pages.create(randomPage(user.id));

            const firstQuestion = await database.questions.create(randomQuestion(firstPage.id));
            const secondQuestion = await database.questions.create(randomQuestion(secondPage.id));

            const [retrievedFirst] = await database.questions.getByPage(firstPage.id);
            const [retrievedSecond] = await database.questions.getByPage(secondPage.id);

            expect(retrievedFirst).toEqual(firstQuestion);
            expect(retrievedSecond).toEqual(secondQuestion);
        });

        it(" `nonArchivedByPage` only returns questions that are _not_ archived", async () => {

            const user = await database.users.create(randomUser());
            const page = await database.pages.create(randomPage(user.id));

            const notArchived = await database.questions.create(randomQuestion(page.id, false));
            const archived = await database.questions.create(randomQuestion(page.id, true));

            const retrieved = await database.questions.getNonArchivedByPage(page.id);


            expect(retrieved).toContainEqual(notArchived);
            expect(retrieved).not.toContain(archived);
        });

        it("Is possible to get a single question", async () => {

            const [_, __, [question]] = await setupQuestions();

            const retrieved = await database.questions.get(question.id);
            expect(retrieved).toEqual(question);
        });

        it("Returns questions ordered by `.display_order`", async () => {

            const [_, page, [a, b, c]] = await setupQuestions(3);

            const firstOrder = 10;
            const secondOrder = 20;
            const thirdOrder = 30;

            await database.questions.update({
                ...a,
                display_order: secondOrder
            });

            await database.questions.update({
                ...b,
                display_order: firstOrder
            });


            await database.questions.update({
                ...c,
                display_order: thirdOrder
            });

            const [first, second, third] = await database.questions.getByPage(page.id);

            expect(first.display_order).toEqual(firstOrder);
            expect(second.display_order).toEqual(secondOrder);
            expect(third.display_order).toEqual(thirdOrder);

            expect(first.id).toEqual(b.id);
            expect(second.id).toEqual(a.id);
            expect(third.id).toEqual(c.id);
        });

        it("Returns non-archived questions ordered by `.display_order`", async () => {

            const [_, __, [question]] = await setupQuestions();

            const retrieved = await database.questions.get(question.id);
            expect(retrieved).toEqual(question);
        });

        it("Returns questions ordered by `.display_order`", async () => {

            const [_, page, [a, b, c]] = await setupQuestions(3);

            const firstOrder = 10;
            const secondOrder = 20;
            const thirdOrder = 30;

            await database.questions.update({
                ...a,
                display_order: secondOrder,
                archived: false,
            });

            await database.questions.update({
                ...b,
                display_order: firstOrder,
                archived: false,
            });


            await database.questions.update({
                ...c,
                display_order: thirdOrder,
                archived: false,
            });

            const [first, second, third] = await database.questions.getByPage(page.id);

            expect(first.display_order).toEqual(firstOrder);
            expect(second.display_order).toEqual(secondOrder);
            expect(third.display_order).toEqual(thirdOrder);

            expect(first.id).toEqual(b.id);
            expect(second.id).toEqual(a.id);
            expect(third.id).toEqual(c.id);
        });
    });

    describe("Updating of a question", () => {

        it("Is possible to update text of question", async () => {

            const [_, __, [question]] = await setupQuestions();

            const before = await database.questions.get(question.id);
            await database.questions.update({
                ...before,
                text: faker.lorem.words(10)
            });
            const after = await database.questions.get(question.id);

            expect(before.id).toEqual(after.id);
            expect(before.page_id).toEqual(after.page_id);
            expect(before.text).not.toEqual(after.text);
        });

        it("Does define ordering after updating it", async () => {

            const [_, __, [before]] = await setupQuestions();
            await database.questions.update({
                ...before,
                display_order: 1
            });

            const after = await database.questions.get(before.id);

            expect(before.display_order).toEqual(0);
            expect(after.display_order).toEqual(1);
        });

        it("Is possible to update the order of a question", async () => {

            const [_, __, [original]] = await setupQuestions();

            const order = faker.random.number();
            await database.questions.update({
                ...original,
                display_order: order
            });

            const retrieved = await database.questions.get(original.id);

            expect(original.display_order).not.toEqual(order);
            expect(retrieved.display_order).toEqual(order);
        });

        describe("question archivation", () => {
            it(" Stores an `archived` prop", async () => {

                const [_, __, [question]] = await setupQuestions();
                const persisted = await database.questions.get(question.id);
                expect(persisted.archived).toBeDefined();
            });

            it(" Can be false", async () => {

                const [_, __, [question]] = await setupQuestions(1, false);
                const persisted = await database.questions.get(question.id);
                expect(persisted.archived).toBe(false);
            });

            it("Can be true ", async () => {

                const [_, __, [question]] = await setupQuestions(1, true);
                const persisted = await database.questions.get(question.id);
                expect(persisted.archived).toBe(true);
            });

            it("Is possible to update archivation status", async () => {

                const [_, __, [before]] = await setupQuestions(1, true);
                await database.questions.update({
                    ...before,
                    archived: !before.archived
                });

                const after = await database.questions.get(before.id);

                expect(before.id).toEqual(after.id);
                expect(before.text).toEqual(after.text);
                expect(before.archived).not.toEqual(after.archived);
            });
        })
    })



});