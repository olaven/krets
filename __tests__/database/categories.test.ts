import * as faker from "faker";
import { categories } from "../../src/database/categories";
import { createUser } from "./databaseTestUtils";
import { CategoryModel } from "../../src/models";

describe("Database interface for categories", () => {

    it("is possible to create a category", async () => {

        const owner = await createUser();
        const category: CategoryModel = { name: faker.commerce.productName(), owner_id: owner.id }
        const persisted = await categories.createCategory(category);

        expect(persisted.name).toEqual(category.name);
    });

});