import * as faker from "faker";
import { pages, users, responses } from "../../src/database/database";
import { UserModel } from "../../src/models";
import { randomPage } from "./databaseTestUtils";

describe("Database interface for pages", () => {

    const createUser = async (): Promise<UserModel> => users.createUser({
        id: faker.random.uuid() as string
    });

    const createPage = (ownerId: string) =>
        pages.createPage({
            owner_id: ownerId,
            name: faker.company.companyName(),
            id: faker.random.uuid()
        })


    it("Can create page", async () => {

        const owner = await createUser();

        const id = faker.random.uuid();
        const page = {
            owner_id: owner.id,
            name: "Amazing cafe!",
            id: id
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
            id: faker.random.uuid()
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