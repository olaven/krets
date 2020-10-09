import { database } from "../../src/database/database";
import { setupAnswers } from "./databaseTestUtils";

describe("The query for generating summary reports", () => {

    it("does return something", async () => {

        const [user, page, response, answer] = await setupAnswers(1);
        const result = await database.summary.get(user.id);

        expect(result).toBeDefined();
        expect(result).not.toBe(null);
        expect(result.forEach).toBeDefined(); //looks like array
    });

    it("Does return something looking like SummaryModel", async () => {

        const [user] = await setupAnswers(1);
        const [summaryOfFirstPage] = await database.summary.get(user.id);

        expect(summaryOfFirstPage.answer_text).toBeDefined();
        expect(summaryOfFirstPage.answer_text).not.toBeNull();

        expect(summaryOfFirstPage.contact_details).toBeDefined();
        //NOTE: contact details will actually be null here, as not provided
        //expect(summaryOfFirstPage.contact_details).not.toBeNull();

        expect(summaryOfFirstPage.emotion).toBeDefined();
        expect(summaryOfFirstPage.emotion).not.toBeNull();

        expect(summaryOfFirstPage.page_name).toBeDefined();
        expect(summaryOfFirstPage.page_name).not.toBeNull();

        expect(summaryOfFirstPage.question_text).toBeDefined();
        expect(summaryOfFirstPage.question_text).not.toBeNull();
    });

    it("Only returns summaries of pages from given user", async () => {

        const [user, page, response, answer] = await setupAnswers(1);
        const summaries = await database.summary.get(user.id);

        for (const summary of summaries) {

            expect(summary.page_name).toEqual(page.name);
        }
    });

    //const [user, page, response, answer] = await setupAnswers(1);
});