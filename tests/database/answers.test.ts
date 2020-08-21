import { answers } from "../../src/database/answers";
import { uid } from "../api/apiTestUtils";
import { randomAnswer, setupAnswers } from "./databaseTestUtils";


describe("The datbase interface for answers", () => {
    it("Is possible to create an answer", async () => {

        const [response] = await setupAnswers(0);

        const before = await randomAnswer(response.id)
        const persisted = await answers.createAnswer(before);

        expect(persisted).toBeDefined();
        expect(persisted.text).toEqual(before.text);
        expect(persisted.response_id).toEqual(before.response_id);
    });

    it("Is not possible to create an answer for non-existent response", async () => {

        const id = uid(); //NOTE: never persisted, does not exist
        const before = await randomAnswer(id)

        expect(async () => {

            await answers.createAnswer(before);
        }).rejects.toThrow()
    });

    it("Is possible to retrieve answers by response id", async () => {

        const [response, persisted] = await setupAnswers();
        const retrieved = await answers.getByResponse(response.id);

        expect(retrieved).toEqual(persisted);
    });

    it("Returns an empty array if requesting from response that does not exist", async () => {

        const retrieved = await answers.getByResponse("-1");
        expect(retrieved).toEqual([]);
    });

    it("Retrieving does not timeout or crash on its own", async () => {

        const [response] = await setupAnswers();
        await answers.getByResponse(response.id);
        expect(true).toBeTruthy(); //NOTEjust asserting something at the ned 
    });
});