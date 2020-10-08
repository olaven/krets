import { convertToJson, convertToSheet, writeToFile } from "../src/sheetjs"

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
            both());
        expect(() => {
            writeToFile(sheet)
        }).not.toThrow();
    });
})