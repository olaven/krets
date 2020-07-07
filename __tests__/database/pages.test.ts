import { pages } from "../../src/database/pages";
import * as faker from "faker";
import { users } from "../../src/database/users";
import { UserModel } from "../../src/models";

describe("Database endpoint for pages", () => {

    const createUser = async (): Promise<UserModel> => users.createUser({
        id: faker.random.uuid() as string
    });

    test("Can create page", async () => {

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

    test("Can update page", async () => {

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
    })
});