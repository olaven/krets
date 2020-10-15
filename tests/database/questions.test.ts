import * as faker from "faker";
import { database } from "../../src/database/database";
import { randomPage } from "../api/apiTestUtils";
import { randomQuestion, randomUser, setupQuestions } from "./databaseTestUtils";

describe("The API interface for questions", () => {


    describe("Question creation", () => {

        it("Is possible to create questions", async () => {

            const [_, page] = await setupQuestions();
            const question = await randomQuestion(page.id);
            const persisted = await database.questions.createQuestion(question);

            expect(question.id).not.toBeDefined();
            expect(persisted.id).toBeDefined();
            expect(question.text).toEqual(persisted.text);
            expect(question.page_id).toEqual(persisted.page_id);
        });
    })

    describe("Question retrieval", () => {



        it("Is possible to get questions by page", async () => {

            const user = await database.users.createUser(randomUser());

            const firstPage = await database.pages.createPage(randomPage(user.id));
            const secondPage = await database.pages.createPage(randomPage(user.id));

            const firstQuestion = await database.questions.createQuestion(randomQuestion(firstPage.id));
            const secondQuestion = await database.questions.createQuestion(randomQuestion(secondPage.id));

            const [retrievedFirst] = await database.questions.getByPage(firstPage.id);
            const [retrievedSecond] = await database.questions.getByPage(secondPage.id);

            expect(retrievedFirst).toEqual(firstQuestion);
            expect(retrievedSecond).toEqual(secondQuestion);
        });

        it("`nonArchivedByPage` only returns questions that are _not_ archived", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));

            const notArchived = await database.questions.createQuestion(randomQuestion(page.id, false));
            const archived = await database.questions.createQuestion(randomQuestion(page.id, true));

            const retrieved = await database.questions.getNonArchivedByPage(page.id);


            expect(retrieved).toContainEqual(notArchived);
            expect(retrieved).not.toContain(archived);
        });

        it("Is possible to get a single question", async () => {

            const [_, __, [question]] = await setupQuestions();

            const retrieved = await database.questions.getQuestion(question.id);
            expect(retrieved).toEqual(question);
        });
    })

    describe("Updating of a question", () => {


        it("Is possible to update text of question", async () => {

            const [_, __, [question]] = await setupQuestions();

            const before = await database.questions.getQuestion(question.id);
            await database.questions.updateQuestion({
                ...before,
                text: faker.lorem.words(10)
            });
            const after = await database.questions.getQuestion(question.id);

            expect(before.id).toEqual(after.id);
            expect(before.page_id).toEqual(after.page_id);
            expect(before.text).not.toEqual(after.text);
        });

        describe("question archivation", () => {
            it("Stores an `archived` prop", async () => {

                const [_, __, [question]] = await setupQuestions();
                const persisted = await database.questions.getQuestion(question.id);
                expect(persisted.archived).toBeDefined();
            });

            it("Can be false", async () => {

                const [_, __, [question]] = await setupQuestions(1, false);
                const persisted = await database.questions.getQuestion(question.id);
                expect(persisted.archived).toBe(false);
            });

            it("Can be true ", async () => {

                const [_, __, [question]] = await setupQuestions(1, true);
                const persisted = await database.questions.getQuestion(question.id);
                expect(persisted.archived).toBe(true);
            });

            it("Is possible to update archivation status", async () => {

                const [_, __, [before]] = await setupQuestions(1, true);
                await database.questions.updateQuestion({
                    ...before,
                    archived: !before.archived
                });

                const after = await database.questions.getQuestion(before.id);

                expect(before.id).toEqual(after.id);
                expect(before.text).toEqual(after.text);
                expect(before.archived).not.toEqual(after.archived);
            });
        })
    })



});