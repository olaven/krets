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


        describe("Pagination behaviour", async () => {

            it("Reading returns 10 responses by default", async () => {

                const pageSize = 10;
                //NOTE: persisting more than pageSize
                const [page, owner, persisted] = await blindSetup(pageSize + 5)
                const retrieved = await responses.getResponses(page.id)

                expect(persisted.length).toBeGreaterThan(pageSize)
                expect(retrieved.length).toEqual(pageSize);
            });

            it("Is possible to specify other pageSize", async () => {

                const pageSize = 2;
                const [page] = await blindSetup(pageSize + 3);

                const retrieved = await responses.getResponses(page.id, {
                    amount: pageSize
                });
                expect(retrieved.length).toEqual(pageSize);
            });

            it("Returns only after given creation date key", async () => {

                const pageSize = 5;
                const [page, _, persisted] = await blindSetup(pageSize);

                const [first, second, third] = persisted;

                const retrieved = (await responses.getResponses(page.id, {
                    amount: pageSize,
                    key: second.created_at //NOTE: everything _after_ second
                })).map(r => r.id);

                expect(retrieved).not.toContain(first.id);//as comes before key 
                expect(retrieved).not.toContain(second.id);//as is equal to key 
                expect(retrieved).toContain(third.id);

                expect(persisted.length).toEqual(pageSize) //all should be in the database
                expect(retrieved.length).toEqual(pageSize - 2) // all, but first and second was excluded 
            });

            it("Returns only after given creation date key, limited by pageSize", async () => {

                const pageSize = 2;
                const [page, _, persisted] = await blindSetup(8); //NOTE: four times page size

                const [first, second] = persisted;

                const retrieved = (await responses.getResponses(page.id, {
                    amount: pageSize,
                    key: first.created_at //NOTE: everything _after_ first
                })).map(r => r.id);

                expect(retrieved).not.toContain(first.id);//as comes before key 
                expect(retrieved).toContain(second.id);

                expect(retrieved.length).toEqual(pageSize);
                expect(persisted.length).toEqual(8)

            });
        })
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

        it("Returns responses sorted by date, with newest first", async () => {

            const [page] = await blindSetup();
            const retrieved = await responses.getResponses(page.id);

            for (let i = 1; i < retrieved.length; i++) {

                const previous = new Date(retrieved[i - 1].created_at).getTime();
                const current = new Date(retrieved[i].created_at).getTime();

                expect(previous).toBeGreaterThan(current);
            }
        });

        it("Returns coordinates", async () => {

            const [page] = await blindSetup();
            const [coordinate] = await responses.getLineCoordinates(page.id);


            expect(coordinate.x).toBeDefined();
            expect(coordinate.y).toBeDefined();
        });
    });
});