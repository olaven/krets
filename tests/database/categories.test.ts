import * as faker from "faker";
import { categories } from "../../src/database/categories";
import { randomUser } from "./databaseTestUtils";
import { CategoryModel } from "../../src/models/models";
import { users } from "../../src/database/users";

describe("Database interface for categories", () => {

    const randomCategory = (ownerId: string): CategoryModel => ({
        name: faker.commerce.productName(),
        owner_id: ownerId
    });

    it("is possible to create a category", async () => {

        const owner = await users.createUser(randomUser())
        const category = randomCategory(owner.id);
        const persisted = await categories.createCategory(category);

        expect(persisted.name).toEqual(category.name);
    });

    it("Method for creation does return the persisted category", async () => {

        const owner = await users.createUser(randomUser())
        const category = await categories.createCategory(randomCategory(owner.id));

        expect(category).not.toBeUndefined();
        expect(category.owner_id).toEqual(owner.id);
    });

    it("Is possible to get by owner", async () => {

        const n = faker.random.number(15);
        const owner = await users.createUser(randomUser())

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await categories.createCategory(category);
        };

        const retrieved = await categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    });


    it("Does not return from other owners", async () => {

        const n = faker.random.number(15);
        const owner = await users.createUser(randomUser())

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await categories.createCategory(category);
        };

        const m = faker.random.number(15);
        const other = await users.createUser(randomUser());

        for (let i = 0; i < m; i++) {

            const category = randomCategory(other.id);
            await categories.createCategory(category);
        };

        const retrieved = await categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    });


    it("returns category objects", async () => {

        const owner = await users.createUser(randomUser())
        const n = faker.random.number(10) + 1;

        /* 
        //NOTE: This approach is way cleaner IMO, but fails. I should figure out why. 
        const persisted = await Promise.allSettled(
            new Array(n)
                .map(() => randomCategory(owner.id))
                .map((category) => categories.createCategory(category))
        ); */

        const persisted: CategoryModel[] = [];
        for (let i = 0; i < n; i++) {

            const category = await categories.createCategory(randomCategory(owner.id));
            persisted.push(category);
        }

        const retrieved = await categories.getByOwner(owner.id);

        expect(persisted.length).toEqual(n);
        expect(retrieved.length).toEqual(n);
        expect(persisted).toEqual(retrieved);
    });
});