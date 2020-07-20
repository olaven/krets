import * as faker from "faker";
import { categories } from "../../src/database/categories";
import { createUser } from "./databaseTestUtils";
import { CategoryModel } from "../../src/models";

describe("Database interface for categories", () => {

    const randomCategory = (ownerId: string): CategoryModel => ({
        name: faker.commerce.productName(),
        owner_id: ownerId
    });

    it("is possible to create a category", async () => {

        const owner = await createUser();
        const category = randomCategory(owner.id);
        const persisted = await categories.createCategory(category);

        expect(persisted.name).toEqual(category.name);
    });

    it("Is possible to get by owner", async () => {

        const n = faker.random.number(15);
        const owner = await createUser();

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await categories.createCategory(category);
        };

        const retrieved = await categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    });


    it("Does not return from other owners", async () => {

        const n = faker.random.number(15);
        const owner = await createUser();

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await categories.createCategory(category);
        };

        const m = faker.random.number(15);
        const other = await createUser();

        for (let i = 0; i < m; i++) {

            const category = randomCategory(other.id);
            await categories.createCategory(category);
        };

        const retrieved = await categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    })
});