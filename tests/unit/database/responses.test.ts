import * as faker from "faker";
import { randomResponse, randomUser, randomPage, blindSetup, setupPage } from "./databaseTestUtils";
import { convertEmotion } from "../../../src/database/responses";
import { database } from "../../../src/database/database";
import { DistributionModel, PageModel, ResponseModel } from "../../../src/models/models";
import { uid } from "../api/apiTestUtils";
import { first } from "../../../src/database/helpers/query";
import { emotionToNumeric } from "../../../src/components/Admin/Charts/ChartUtils";
import { date } from "../../../src/date";


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

            const user = await database.users.create(randomUser());
            const page = await database.pages.create(randomPage(user.id));

            const average = await database.responses.getAverageEmotionByPage(page.id);
            expect(average).not.toBeNaN();
        });

        it("Returns 0 if no responses are present", async () => {

            const user = await database.users.create(randomUser());
            const page = await database.pages.create(randomPage(user.id));

            const average = await database.responses.getAverageEmotionByPage(page.id);
            expect(average).toEqual(0);
        })

        it("Returns the average of persisted responses", async () => {

            const user = await database.users.create(randomUser());
            const page = await database.pages.create(randomPage(user.id));

            await database.responses.create(randomResponse(page.id, ":-)")); //2 
            await database.responses.create(randomResponse(page.id, ":-|")); //1

            const average = await database.responses.getAverageEmotionByPage(page.id);
            expect(average).toEqual(1.5) // (2 + 1) / 2
        });
    });

    describe("Basic CRUD operation on responses", () => {


        test("Can get responses", async () => {

            const result = await database.responses.getByPage(faker.random.uuid());
            expect(result).toEqual([]);
        });

        test("Can create response", async () => {

            const user = await database.users.create(randomUser());
            const page = await await database.pages.create(randomPage(user.id));

            const before = await database.responses.getByPage(page.id);
            await database.responses.create({
                emotion: ':-)',
                page_id: page.id
            });
            const after = await database.responses.getByPage(page.id);

            expect(before.length).toEqual(0);
            expect(after.length).toEqual(1);
        });

        test("Can create response with contact details", async () => {

            const user = await database.users.create(randomUser());
            const page = await database.pages.create(randomPage(user.id));
            const contact_details = "mail@example.com";

            await database.responses.create(randomResponse(page.id, ":-)", contact_details));

            const retrieved = await database.responses.getByPage(page.id);
            expect(retrieved.length).toEqual(1);

            const [response] = retrieved;
            expect(response.contact_details).toEqual(contact_details)
        });

        test("Can get specific responses", async () => {

            const [_u, _uu, [first, second, third]] = await blindSetup(3);

            const retrievedFirst = await database.responses.get(first.id);
            expect(retrievedFirst).toEqual(first);

            const retrievedSecond = await database.responses.get(second.id);
            expect(retrievedSecond).toEqual(second);

            const retrievedThird = await database.responses.get(third.id)
            expect(retrievedThird).toEqual(third);
        });

        describe("Getting after specific date", () => {

            //TODO: extract to common file 
            const comparable = (array: { id?: string }[]) =>
                array.map(it => it.id).sort();

            const createAt = async (...dates: Date[]): Promise<[PageModel, ResponseModel[]]> => {

                const [_, page] = await setupPage();
                const response = randomResponse(page.id);

                const persisted: ResponseModel[] = [];
                for (const date of dates) {

                    persisted.push(
                        await first<ResponseModel>(
                            "insert into responses(emotion, page_id, contact_details, created_at) values($1, $2, $3, $4) RETURNING *",
                            [emotionToNumeric(response.emotion), response.page_id, response.contact_details, date]
                        )
                    );
                }

                return [page, persisted];
            }

            it("does not crash", async () => {

                const [page] = await blindSetup();
                expect(database.responses.getAfter(page.id, faker.date.past(1)))
                    .resolves.not.toThrow();
            });

            it("does return an array", async () => {

                const [page] = await blindSetup();
                const retrieved = await database.responses.getAfter(page.id, faker.date.past(1));

                expect(retrieved.push).toBeDefined();
                expect(retrieved.slice).toBeDefined();
            });

            it("does return all elements if younger", async () => {

                //NOTE: This test assumes that `blindSetup`/`databaseTestUtils` creates dates with `faker.date.past(1)`
                const [page, _, persisted] = await blindSetup();
                const retrieved = await database.responses.getAfter(page.id, date().last(1).year());

                expect(persisted.length).toEqual(retrieved.length);
                expect(comparable(persisted)).toEqual(comparable(retrieved));
            });

            it("only returns those younger than requested date", async () => {

                const [page, [first, second, third]] = await createAt(
                    date().last(1).day(),
                    date().last(3).day(),
                    date().last(5).day(),
                );

                const retrieved = comparable(
                    await database.responses.getAfter(
                        page.id,
                        date().last(4).day()
                    )
                )

                expect(retrieved.length).toEqual(2);
                expect(retrieved).toContain(first.id);
                expect(retrieved).toContain(second.id);
                expect(retrieved).not.toContain(third.id);
            });

            it("excludes excact equal days", async () => {

                const d = date().last(1).day();
                const [page, [response]] = await createAt(
                    d
                );

                const retrieved = comparable(
                    await database.responses.getAfter(
                        page.id,
                        d
                    )
                );

                expect(retrieved.length).toEqual(0);
                expect(retrieved).not.toContain(response.id);
            });
        });


        describe("Pagination behaviour", () => {

            it("Reading returns 10 responses by default", async () => {

                const pageSize = 10;
                //NOTE: persisting more than pageSize
                const [page, owner, persisted] = await blindSetup(pageSize + 5)
                const retrieved = await database.responses.getByPage(page.id)

                expect(persisted.length).toBeGreaterThan(pageSize)
                expect(retrieved.length).toEqual(pageSize);
            });

            it("Is possible to specify other pageSize", async () => {

                const pageSize = 2;
                const [page] = await blindSetup(pageSize + 3);

                const retrieved = await database.responses.getByPage(page.id, {
                    amount: pageSize
                });
                expect(retrieved.length).toEqual(pageSize);
            });

            it("Returns only after given creation date key", async () => {

                const pageSize = 5;
                const [page, _, persisted] = await blindSetup(pageSize);

                const [first, second, third] = persisted;

                const retrieved = (await database.responses.getByPage(page.id, {
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

                const retrieved = (await database.responses.getByPage(page.id, {
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
            const coordinates = await database.responses.getLineCoordinates(page.id);

            expect(coordinates).toBeInstanceOf(Array);
        });

        it("Returns the same amount of responses as perssited", async () => {

            const [page, _, persisted] = await blindSetup();
            const coordinates = await database.responses.getLineCoordinates(page.id);

            expect(persisted.length).toBeGreaterThan(0);
            expect(coordinates.length).toEqual(persisted.length)
        });

        it("Returns responses sorted by date, with newest first", async () => {

            const [page] = await blindSetup();
            const retrieved = await database.responses.getByPage(page.id);

            for (let i = 1; i < retrieved.length; i++) {

                const previous = new Date(retrieved[i - 1].created_at).getTime();
                const current = new Date(retrieved[i].created_at).getTime();

                expect(previous).toBeGreaterThan(current);
            }
        });

        it("Returns coordinates", async () => {

            const [page] = await blindSetup();
            const [coordinate] = await database.responses.getLineCoordinates(page.id);


            expect(coordinate.x).toBeDefined();
            expect(coordinate.y).toBeDefined();
        });
    });

    describe("Getting the amount of responses on a page", () => {

        it("Returns a number", async () => {

            const [page] = await blindSetup();

            const count = await database.responses.getCount(page.id);
            expect(parseInt((count as unknown as string))).not.toBeNaN();
        });

        it("Returns the same number as count of responses", async () => {

            const n = await faker.random.number({ min: 1, max: 20 });
            const [page] = await blindSetup(n);

            const count = await database.responses.getCount(page.id);
            expect(count).toEqual(n);
        });

        it("Works when no responses are persisted", async () => {

            const [page] = await blindSetup(0);
            const count = await database.responses.getCount(page.id);
            expect(count).toEqual(0)
        });
    });

    describe("Calculation of emoji distribution data", () => {

        const randomDistribution = async () => {

            const [page] = await blindSetup();
            const distribution = await database.responses.getEmojiDistribution(page.id);
            return distribution;
        }
        it(" Does not throw when run", async () => {

            const [page] = await blindSetup();
            expect(
                database.responses.getEmojiDistribution(page.id)
            ).resolves.not.toThrow();
        });

        it("Does return a defined object", async () => {

            const distribution = await randomDistribution();

            expect(distribution).not.toBeNull();
            expect(distribution).not.toBeUndefined();
        });

        it("Returns an object with 'sad', 'neutral' and 'happy'", async () => {

            const distribution = await randomDistribution();

            expect(distribution.sad).toBeDefined();
            expect(distribution.neutral).toBeDefined();
            expect(distribution.happy).toBeDefined();
        });
        it("'sad', 'neutral' and 'happy' are numeric strings", async () => {

            //NOTE: strings due to bigint issue with Postgres/JS number limits
            const distribution = await randomDistribution();

            expect(parseInt(distribution.sad)).not.toBeNaN();
            expect(parseInt(distribution.neutral)).not.toBeNaN();
            expect(parseInt(distribution.happy)).not.toBeNaN();
        });

        it("Only gets distribution from the requested page", async () => {

            const n = faker.random.number({ min: 0, max: 8 })
            const [page, _, persisted] = await blindSetup(n);
            const distribution = await database.responses.getEmojiDistribution(page.id);

            const sum = parseInt(distribution.sad) + parseInt(distribution.neutral) + parseInt(distribution.happy);


            expect(distribution.page_id).toEqual(page.id);
            expect(persisted.length).toEqual(n);
            expect(sum).toEqual(n);
        });

        it(" Returned numbers match responses in database - first", async () => {

            const [_, page] = await setupPage();

            //NOTE: three happy
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));

            //NOTE: five neutral
            await database.responses.create(randomResponse(page.id, ":-|"));
            await database.responses.create(randomResponse(page.id, ":-|"));
            await database.responses.create(randomResponse(page.id, ":-|"));
            await database.responses.create(randomResponse(page.id, ":-|"));
            await database.responses.create(randomResponse(page.id, ":-|"));

            //NOTE: two sad 
            await database.responses.create(randomResponse(page.id, ":-("));
            await database.responses.create(randomResponse(page.id, ":-("));

            const distribution = await database.responses.getEmojiDistribution(page.id);
            expect(distribution.happy).toEqual("3");
            expect(distribution.neutral).toEqual("5");
            expect(distribution.sad).toEqual("2");
        });


        it(" Returned numbers match responses in database - second", async () => {

            const [_, page] = await setupPage();

            //NOTE: eight happy
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));
            await database.responses.create(randomResponse(page.id, ":-)"));

            //NOTE: two neutral
            await database.responses.create(randomResponse(page.id, ":-|"));
            await database.responses.create(randomResponse(page.id, ":-|"));

            //NOTE: four sad
            await database.responses.create(randomResponse(page.id, ":-("));
            await database.responses.create(randomResponse(page.id, ":-("));
            await database.responses.create(randomResponse(page.id, ":-("));
            await database.responses.create(randomResponse(page.id, ":-("));

            const distribution = await database.responses.getEmojiDistribution(page.id);
            expect(distribution.happy).toEqual("8");
            expect(distribution.neutral).toEqual("2");
            expect(distribution.sad).toEqual("4");
        });
    });
});