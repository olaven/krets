import * as faker from "faker";
import { responses } from "../../src/database/responses";
import { randomResponse, randomUser, randomPage } from "./databaseTestUtils";
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

    test("Can create response with contact details", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));
        const contact_details = "mail@example.com";

        await responses.createResponse(randomResponse(user.id, page.id, ":-)", contact_details));

        const retrieved = await responses.getResponses(page.id);
        expect(retrieved.length).toEqual(1);

        const [response] = retrieved;
        expect(response.contact_details).toEqual(contact_details)
    });
});