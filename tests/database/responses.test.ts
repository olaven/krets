import * as faker from "faker";
import { responses, convertEmotion } from "../../src/database/responses";
import { randomResponse, randomUser, randomPage } from "./databaseTestUtils";
import { users } from "../../src/database/users";
import { pages } from "../../src/database/pages";


describe("Database repository for pages", () => {

    describe("Conversion function between schema representation and model representation", () => {

        describe("The conversion of Emotion", () => {

            it("Converts from model to SQL", () => {

                const happy = convertEmotion.toSQL(":-)");
                const neutral = convertEmotion.toSQL(":-|");
                const sad = convertEmotion.toSQL(":-(");

                expect(happy).toEqual(2);
                expect(neutral).toEqual(1);
                expect(sad).toEqual(0);
            });

            it("Converts from SQL to model", () => {

                const happy = convertEmotion.toModel(2);
                const neutral = convertEmotion.toModel(1);
                const sad = convertEmotion.toModel(0);

                expect(happy).toEqual(":-)");
                expect(neutral).toEqual(":-|");
                expect(sad).toEqual(":-(");
            });
        })
    })

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

        await responses.createResponse(randomResponse(page.id, ":-)", contact_details));

        const retrieved = await responses.getResponses(page.id);
        expect(retrieved.length).toEqual(1);

        const [response] = retrieved;
        expect(response.contact_details).toEqual(contact_details)
    });
});