import { database } from "../../../src/database/database"
import { randomEmbeddable, setupEmbeddable, setupPages } from "./databaseTestUtils";

describe("The database interface for embeddables", () => {

    describe("Retrieval of an embeddable by token", () => {

        it("exports a method to get embeddable by token", () => {

            expect(database.embeddables.getByToken).toBeDefined();
        });

        it("Is possible to retrieve an embeddable by token", async () => {

            const [_, __, persisted] = await setupEmbeddable();
            const retrieved = await database.embeddables.getByToken(persisted.token);

            expect(persisted).toEqual(retrieved);
        });

        it("It returns an embeddable with the correct token", async () => {

            const [_, __, persisted] = await setupEmbeddable();
            const retrieved = await database.embeddables.getByToken(persisted.token);

            expect(persisted.token).toEqual(retrieved.token);
        });

        it("It returns an embeddable for the correct page", async () => {

            const [_, page, persisted] = await setupEmbeddable();
            const retrieved = await database.embeddables.getByToken(persisted.token);

            expect(retrieved.page_id).toEqual(page.id);
            expect(persisted.page_id).toEqual(page.id);
        });
    });

    describe("Creation of embeddables", () => {
        it("exports a method to create embeddable", () => {

            expect(database.embeddables.createEmbeddable).toBeDefined();
        });

        it("Is possible to create an embeddable without crashing ", async () => {

            const [_, [page]] = await setupPages(1);
            const original = randomEmbeddable(page.id);
            const persisted = await database.embeddables.create(original);

            expect(original.id).not.toBeDefined();
            expect(persisted.id).toBeDefined();

            expect(original.token).toEqual(persisted.token);
            expect(original.page_id).toEqual(persisted.page_id);
        });
    });

});