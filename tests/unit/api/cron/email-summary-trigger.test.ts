import * as faker from "faker";
import fetch from "cross-fetch";
import { setupServer, teardownServer } from "../apiTestUtils";
import { randomAnswer, randomResponse, setupPages } from "../../database/databaseTestUtils";
import handler, { filterOutIfNoQuestions, toTemplate } from "../../../../src/pages/api/cron/email-summary-trigger";
import { Server } from "net";
import { FORBIDDEN, NOT_FOUND } from "node-kall";
import responses from "../../../../src/pages/api/pages/[id]/responses";
import { database } from "../../../../src/database/database";


jest.mock("../../../../src/auth/auth0");

describe("Email Summary API endpont", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/cron/email-summary-trigger");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    const trigger = (secret = process.env.EMAIL_SUMMARY_SECRET) =>
        fetch(url, {
            headers: {
                "x-krets-email-summary-secret": secret
            }
        })

    describe("Neccecary test environment", () => {

        it("Does have the secret defined", () => {

            expect(process.env.EMAIL_SUMMARY_SECRET).toBeDefined();
        });
    });

    describe("Access of the endpoint", () => {

        it("is found", async () => {

            const { status } = await fetch(url);
            expect(status).not.toEqual(NOT_FOUND);
        });

        it("Does respond with 403 if not no secret secret is provided", async () => {

            const { status } = await fetch(url);
            expect(status).toEqual(FORBIDDEN);
        });

        it("Does respond wiht 403 if a secret is present, if it is wrong", async () => {

            const token = faker.random.uuid();
            const { status } = await trigger(token);

            expect(status).toEqual(FORBIDDEN);
            expect(token).not.toEqual(process.env.EMAIL_SUMMARY_SECRET);
        });

        it("Does _not_ respond with 403 if the correct secret is present", async () => {

            const { status } = await trigger();
            expect(status).not.toEqual(FORBIDDEN)
        });
    });

    describe("The function converting to a template", async () => {

        it("Does not throw", async () => {

            const [_, pages] = await setupPages();
            expect(
                toTemplate(pages)
            ).resolves.not.toThrow();
        });

        it("Does convert to an object wiht same page id", async () => {

            const [_, [page]] = await setupPages();
            const template = await toTemplate([page]);

            expect(template.pages[0].name).toEqual(page.name);
        });

        it(" Does not include responses without text", async () => {

            const [_, [page]] = await setupPages();
            const response = await database.responses.create(randomResponse(page.id));

            const withText = await database.answers.createAnswer({
                ...randomAnswer(response.id),
                text: "somee text is defined here"
            });

            const withoutText = await database.answers.createAnswer({
                ...randomAnswer(response.id),
                text: ""
            });

            const template = await toTemplate([page]);
            const inTemplate = template.pages[0].responses.flatMap(r => r.questions).map(q => q.answer_text);

            expect(inTemplate).toContain(withText.text);
            expect(inTemplate).not.toContain(withoutText.text);
        });

        it("filters out those with no questions", () => {

            const filtered = filterOutIfNoQuestions([
                {
                    emoji: "",
                    contact_details: "first",
                    questions: []
                },
                {
                    emoji: "",
                    contact_details: "second",
                    questions: [{
                        text: "string",
                        answer_text: "string",
                    }]
                }
            ]);

            expect(filtered.map(f => f.contact_details)).not.toContain("first");
            expect(filtered.map(f => f.contact_details)).toContain("second");
        });
    });
});