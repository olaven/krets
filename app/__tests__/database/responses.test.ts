import { responses } from "../../src/database/responses";
import * as faker from "faker";
import { users } from "../../src/database/users";
import { pages } from "../../src/database/pages";


describe("Database repository for pages", () => {

    test("Can get responses", async () => {

        const result = await responses.getResponses(faker.random.uuid());
        expect(result).toEqual([]);
    });

    test("Can create response", async () => {

        const page_id = faker.random.uuid();
        const user = { id: faker.random.uuid() };
        const page = {
            owner_id: user.id,
            name: "Amazing cafe!",
            id: page_id
        };

        await users.createUser(user);
        await pages.createPage(page);

        const before = await responses.getResponses(page_id);
        await responses.createResponse({
            emotion: ':-)',
            text: "",
            page_id: page_id
        });
        const after = await responses.getResponses(page_id);

        expect(before.length).toEqual(0);
        expect(after.length).toEqual(1);
    });
});