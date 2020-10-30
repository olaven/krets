import * as faker from "faker";
import { database } from "../../../src/database/database";
import { randomUser } from "./databaseTestUtils";
import { CategoryModel } from "../../../src/models/models";

describe("Database interface for categories", () => {

    const randomCategory = (ownerId: string): CategoryModel => ({
        name: faker.commerce.productName(),
        owner_id: ownerId
    });

    it("is possible to create a category", async () => {

        const owner = await database.users.create(randomUser())
        const category = randomCategory(owner.id);
        const persisted = await database.categories.create(category);

        expect(persisted.name).toEqual(category.name);
    });

    it("Method for creation does return the persisted category", async () => {

        const owner = await database.users.create(randomUser())
        const category = await database.categories.create(randomCategory(owner.id));

        expect(category).not.toBeUndefined();
        expect(category.owner_id).toEqual(owner.id);
    });

    it("Is possible to get by owner", async () => {

        const n = faker.random.number(15);
        const owner = await database.users.create(randomUser())

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await database.categories.create(category);
        };

        const retrieved = await database.categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    });


    it("Does not return from other owners", async () => {

        const n = faker.random.number(15);
        const owner = await database.users.create(randomUser())

        for (let i = 0; i < n; i++) {

            const category = randomCategory(owner.id);
            await database.categories.create(category);
        };

        const m = faker.random.number(15);
        const other = await database.users.create(randomUser());

        for (let i = 0; i < m; i++) {

            const category = randomCategory(other.id);
            await database.categories.create(category);
        };

        const retrieved = await database.categories.getByOwner(owner.id);
        expect(retrieved.length).toEqual(n);
    });


    it("returns category objects", async () => {

        const owner = await database.users.create(randomUser())
        const n = faker.random.number(10) + 1;

        /* 
        //NOTE: This approach is way cleaner IMO, but fails. I should figure out why. 
        const persisted = await Promise.allSettled(
            new Array(n)
                .map(() => randomCategory(owner.id))
                .map((category) => database.categories.create(category))
        ); */

        const persisted: CategoryModel[] = [];
        for (let i = 0; i < n; i++) {

            const category = await database.categories.create(randomCategory(owner.id));
            persisted.push(category);
        }

        const retrieved = await database.categories.getByOwner(owner.id);

        expect(persisted.length).toEqual(n);
        expect(retrieved.length).toEqual(n);
        expect(persisted).toEqual(retrieved);
    });

    it("Is possible to check wether a page is owned by a user ", async () => {

        const owner = await database.users.create(randomUser())
        const category = await database.categories.create(randomCategory(owner.id));

        const result = await database.categories.hasOwner(owner.id, category.id);
        expect(result).toBe(true);
    });

    it("Returns false if category is not owned by user ", async () => {


        const owner = await database.users.create(randomUser())
        const other = await database.users.create(randomUser())
        const category = await database.categories.create(randomCategory(owner.id));

        //NOTE: not passing `owner`, but `other`
        const result = await database.categories.hasOwner(other.id, category.id);
        expect(result).toBe(false);
    });
});