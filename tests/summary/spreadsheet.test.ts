import * as faker from "faker";
import { random } from "nanoid";
import { SummaryModel } from "../../src/models/models";
import { writeToFile } from "../../src/summary/sheetjs";
import { generateSummarySheet } from "../../src/summary/spreadsheet";
import { randomEmotion } from "../database/databaseTestUtils";

describe("Generating spreadsheets from summary", () => {

    const randomSummaries = (amount = faker.random.number({ min: 1, max: 10 })): SummaryModel[] =>
        new Array(amount).map(() => ({
            page_name: faker.commerce.productName(),
            emotion: randomEmotion(),
            question_text: faker.lorem.sentence(),
            answer_text: faker.lorem.sentence(),
            contact_details: faker.internet.email()
        }));
    it(" Does not throw", () => {

        expect(
            generateSummarySheet(
                randomSummaries()
            )
        ).not.toThrow();
    });

    it("Can write summaries to file", () => {

        writeToFile(
            generateSummarySheet(
                randomSummaries()
            )
        )
    })

    it("Does return the same amount of sheets as summaries passed in", () => {

        const summaries = randomSummaries();
        const sheets = generateSummarySheet(summaries);

        expect(summaries.length).toEqual(sheets.length);
    })
});
