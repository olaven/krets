import { convertToJson, convertToSheet, writeToFile } from "../../src/summary/sheetjs"
import { randomResponse } from "../database/databaseTestUtils";

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

    it("Can convert a response to sheet", () => {

        const original = randomResponse("some-page-id");
        const sheet = convertToSheet([original]);
        const [retrieved] = convertToJson(sheet);

        expect(original).not.toBeNull();
        expect(original).toBeDefined();
        expect(original).toEqual(retrieved);
    });

    it("Does accept two slighly different things", () => {

        const sheet = convertToSheet([
            { a: "value of a" },
            { b: "value of b" }
        ]);

        const [first, second] = convertToJson<any>(sheet);

        expect(first.a).toEqual("value of a");
        expect(second.b).toEqual("value of b");
    });

    it(" Can write two different things", () => {

        /* writeToFile(
            convertToSheet([
                { a: "first of a" },
                { b: "first of b" },
                { a: "second of only a" },
                { a: "a of has both", b: "b of has both" }
            ])
        ); */
    });
})