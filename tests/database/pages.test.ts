import * as faker from "faker";
import { pages, categories, responses } from "../../src/database/database";
import { createUser, createPage, createCategory } from "../../__tests__/database/databaseTestUtils";
import { randomPage } from "../api/apiTestUtils";

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
        const persistedCategory = await categories.createCategory({ name: "category name", owner_id: user.id });

        const page = {
            owner_id: user.id,
            name: "page name",
            id: faker.random.uuid(),
            category_id: persistedCategory.id
        }

        await pages.createPage(page);

        const retrievedPage = await pages.getPage(page.id);
        expect(retrievedPage.category_id).toEqual(persistedCategory.id);
    });


    describe("Getting pages by owner and category", () => {

        it("Can returns pages", async () => {

            const owner = await createUser();
            const category = await createCategory(owner.id);

            const persisted = [];
            for (let i = 0; i < 4; i++) {

                const page = await createPage(owner.id, category.id);
                persisted.push(page);
            }

            const retrieved = await pages.getByOwnerAndCategory(owner.id, category.id);
            expect(retrieved).toEqual(persisted);
        });


        it("Does not return pages with other owners or categories", async () => {

            const owner = await createUser();
            const other = await createUser();
            const ownerCategory = await createCategory(owner.id);
            const otherCategory = await createCategory(other.id);

            const ownerPage = await createPage(owner.id, ownerCategory.id);
            const otherPage = await createPage(other.id, otherCategory.id);

            const retrieved = await pages.getByOwnerAndCategory(owner.id, ownerCategory.id);

            expect(retrieved.length).toEqual(1);
            expect(retrieved[0]).toEqual(ownerPage);
            expect(retrieved[0]).not.toEqual(otherPage);
        });
    });
    describe("The 'color'-column", () => {

        it("Does exist", async () => {

            const color = '#AABBCC';
            const owner = await createUser();
            const page = await pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Does not have to be specified", async () => {

            const color = null;
            const owner = await createUser();
            const page = await pages.createPage(randomPage(owner.id, color));

            expect(page.color).toEqual(color);
        });

        it("Has constraints on char count", async () => {

            const sixChars = '#AABBC';
            const eightChars = '#AABBCCC';
            const owner = await createUser();

            await expect(async () => {

                await pages.createPage(randomPage(owner.id, sixChars));
                await pages.createPage(randomPage(owner.id, eightChars));
            }).rejects.toThrow();
        });

        it("Can be updated", async () => {

            const owner = await createUser();
            const originalColor = '#AABBCC';

            const page = await pages.createPage(randomPage(owner.id, originalColor))
            expect(page.color).toEqual(originalColor);

            const newColor = '#CCBBAA';
            const updated = await pages.updatePage(
                { ...page, color: newColor }
            );

            expect(updated.color).toEqual(newColor);
            expect(updated.color).not.toEqual(page.color);
        })
    })
});