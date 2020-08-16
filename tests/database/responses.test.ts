import * as faker from "faker";
import { randomResponse, randomUser, randomPage, blindSetup } from "./databaseTestUtils";
import { convertEmotion } from "../../src/database/responses";
import { users, pages, responses } from "../../src/database/database";


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
    });

    describe("Calculation of average emotion", () => {

        it("Returns a number", async () => {

            const user = await users.createUser(randomUser());
            const page = await pages.createPage(randomPage(user.id));

            const average = await responses.getAverageEmotionByPage(page.id);
            expect(average).not.toBeNaN();
        });

        it("Returns 0 if no responses are present", async () => {

            const user = await users.createUser(randomUser());
            const page = await pages.createPage(randomPage(user.id));

            const average = await responses.getAverageEmotionByPage(page.id);
            expect(average).toEqual(0);
        })

        it("Returns the average of persisted responses", async () => {

            const user = await users.createUser(randomUser());
            const page = await pages.createPage(randomPage(user.id));

            await responses.createResponse(randomResponse(page.id, ":-)")); //2 
            await responses.createResponse(randomResponse(page.id, ":-|")); //1

            const average = await responses.getAverageEmotionByPage(page.id);
            expect(average).toEqual(1.5) // (2 + 1) / 2
        });
    });

    describe("Basic CRUD operation on responses", () => {


        test("Can get responses", async () => {

            const result = await responses.getResponses(faker.random.uuid());
            expect(result).toEqual([]);
        });

        test("Can create response", async () => {

            const user = await users.createUser(randomUser());
            const page = await await pages.createPage(randomPage(user.id));

            const before = await responses.getResponses(page.id);
            await responses.createResponse({
                emotion: ':-)',
                text: "",
                page_id: page.id
            });
            const after = await responses.getResponses(page.id);

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

    describe("Calculation of line chart data", () => {

        test("Does return an array", async () => {

            const [page] = await blindSetup();
            const coordinates = await responses.getLineCoordinates(page.id);

            expect(coordinates).toBeInstanceOf(Array);
        });

        it("Returns the same amount of responses as perssited", async () => {

            const [page, _, persisted] = await blindSetup();
            const coordinates = await responses.getLineCoordinates(page.id);

            expect(persisted.length).toBeGreaterThan(0);
            expect(coordinates.length).toEqual(persisted.length)
        });

        it("Returns coordinates", async () => {

            const [page] = await blindSetup();
            const [coordinate] = await responses.getLineCoordinates(page.id);


            expect(coordinate.x).toBeDefined();
            expect(coordinate.y).toBeDefined();
        });
    });
});