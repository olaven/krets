import { pages } from "../../src/database/pages";
import * as faker from "faker";
import { users } from "../../src/database/users";
import { UserModel, CategoryModel } from "../../src/models";
import { responses } from "../../src/database/responses";
import { categories } from "../../src/database/categories"; import { createUser, createPage } from "./databaseTestUtils";

describe("Database interface for pages", () => {

    it("Can create page", async () => {

        const owner = await createUser();

        const id = faker.random.uuid();
        const page = {
            owner_id: owner.id,
            name: "Amazing cafe!",
            id: id,
            category_id: null
        };

        const before = await pages.getPage(id);
        await pages.createPage(page);
        const after = await pages.getPage(id);

        expect(before).toBeFalsy();
        expect(after).toBeTruthy;
    });

    it("Can update page", async () => {

        const originalName = faker.company.companyName();
        const updatedName = faker.company.companyName();

        const owner = await createUser();

        const page = {
            owner_id: owner.id,
            name: originalName,
            id: faker.random.uuid(),
            category_id: null
        }

        await pages.createPage(page);

        expect(originalName).not.toEqual(updatedName);
        expect(page.name).toEqual(originalName);

        page.name = updatedName;
        await pages.updatePage(page);

        const after = await pages.getPage(page.id);

        expect(after.name).toEqual(updatedName);
    });

    it("Can delete pages", async () => {


        const owner = await createUser();
        const page = await createPage(owner.id);

        const retrievedBefore = await pages.getPage(page.id);
        expect(retrievedBefore.name).toEqual(page.name);

        await pages.deletePage(page.id);

        const retrievedAfter = await pages.getPage(page.id);
        expect(retrievedAfter).toBeNull();
    });

    it("Deletes responses along with page", async () => {

        const owner = await createUser();
        const page = await createPage(owner.id);

        await responses.createResponse({
            emotion: ":-(",
            text: faker.lorem.sentence(),
            page_id: page.id
        });


        const responsesBefore = await responses.getResponses(page.id);
        expect(responsesBefore.length).toEqual(1);

        await pages.deletePage(page.id);

        const responsesAfter = await responses.getResponses(page.id);
        expect(responsesAfter.length).toEqual(0);
    });

    it("Can set category", async () => {

        const user = await createUser();
        const persistedCategory = await categories.createCategory({ name: "category name" });

        const page = {
            owner_id: user.id,
            name: "page name",
            id: faker.random.uuid(),
            category_id: persistedCategory.id
        }

        await pages.createPage(page);

        const retrievedPage = await pages.getPage(page.id);
        expect(retrievedPage.category_id).toEqual(persistedCategory.id);
    })
});