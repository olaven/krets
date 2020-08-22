import { pages, users, questions } from "../../src/database/database";
import { randomPage } from "../api/apiTestUtils";
import { randomQuestion, randomUser, setupQuestions } from "./databaseTestUtils";

describe("The API interface for questions", () => {

    it("Is possible to create questions", async () => {

        const [_, page] = await setupQuestions();
        const question = await randomQuestion(page.id);
        const persisted = await questions.createQuestion(question);

        expect(question.id).not.toBeDefined();
        expect(persisted.id).toBeDefined();
        expect(question.text).toEqual(persisted.text);
        expect(question.page_id).toEqual(persisted.page_id);
    });

    it("Is possible to get questions by page", async () => {

        const user = await users.createUser(randomUser());

        const firstPage = await pages.createPage(randomPage(user.id));
        const secondPage = await pages.createPage(randomPage(user.id));

        const firstQuestion = await questions.createQuestion(randomQuestion(firstPage.id));
        const secondQuestion = await questions.createQuestion(randomQuestion(secondPage.id));

        const [retrievedFirst] = await questions.getByPage(firstPage.id);
        const [retrievedSecond] = await questions.getByPage(secondPage.id);

        expect(retrievedFirst).toEqual(firstQuestion);
        expect(retrievedSecond).toEqual(secondQuestion);
    });
});