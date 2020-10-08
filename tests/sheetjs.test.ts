import { convertToJson, convertToSheet, writeToFile } from "../src/sheetjs"
import { randomResponse } from "./database/databaseTestUtils";

describe("Understandning sheetJS behaviour", () => {

    const guro = () => ({
        name: "Guro",
        age: 21
    });

    const elon = () => ({
        name: "Elon",
        age: 4
    });

    const both = () => [guro(), elon()];

    it("Does return something", () => {

        const sheet = convertToSheet([{}]);
        expect(sheet).toBeDefined();
        expect(sheet).not.toBeNull();
    });

    it("Contains Guro", () => {

        const sheet = convertToSheet([
            guro()]);
        const [firstRow] = convertToJson<any>(sheet);
        expect(firstRow.name).toEqual("Guro");
    });

    it("Can write JSON object to Excep file", () => {

        const sheet = convertToSheet(
            [randomResponse("pageid")]);
        expect(() => {
            writeToFile(sheet)
        }).not.toThrow();
    });

    it("Can convert a response to sheet", () => {

        const original = randomResponse("some-page-id");
        const sheet = convertToSheet([original]);
        const [retrieved] = convertToJson(sheet);

        expect(original).not.toBeNull();
        expect(original).toBeDefined();
        expect(original).toEqual(retrieved);
    });
})