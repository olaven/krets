import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../../../apiTestUtils";
import answersHandler from '../../../../../../src/pages/api/pages/[id]/responses/[responseId]/answers';
import { users, } from "../../../../../../src/database/database";
import { randomAnswer, randomUser, setupAnswers } from "../../../../../database/databaseTestUtils";
import { AnswerModel } from "../../../../../../src/models/models";

jest.mock("../../../../../../src/auth/auth0");

describe("The endpoint for answers on a given response", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string, responseId: string) =>
        `${url}/${pageId}/responses/${responseId}/answers`;

    beforeAll(async () => {

        [server, url] = await setupServer(answersHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });


    describe("Retriveval of answers", () => {

        it("Returns 401 if not authenticated", async () => {

            const [_, page, response, __] = await setupAnswers()

            const { status } = await fetch(fullURL(page.id, response.id));
            expect(status).toEqual(401);
        });

        it("Returns 403 if authenticated, but not page owner", async () => {

            const [owner, page, response, __] = await setupAnswers();
            const other = await users.createUser(randomUser());
            expect(owner.id).not.toEqual(other.id);

            const { status } = await authenticatedFetch(other.id, fullURL(page.id, response.id));
            expect(status).toEqual(403);
        });

        it("Actually returns the same answers as those persisted", async () => {

            const [owner, page, response, persisted] = await setupAnswers();
            const retrieved = await ((await authenticatedFetch(owner.id, fullURL(page.id, response.id))).json()) as AnswerModel[]

            for (const answer of persisted) {

                const found = retrieved.find(a => a.id === answer.id);
                expect(found).toBeTruthy();
            }
        });
    });


    describe("Creation of answers", () => {

        it("Returns 401 if not authenticated", async () => {

            const [_, page, response, __] = await setupAnswers()

            const { status } = await fetch(fullURL(page.id, response.id), {
                method: "POST",
                body: JSON.stringify(randomAnswer(response.id)),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            expect(status).toEqual(401);
        });

        it("Returns 403 if authenticated, but not page owner", async () => {

            const [owner, page, response, __] = await setupAnswers();
            const other = await users.createUser(randomUser());
            expect(owner.id).not.toEqual(other.id);

            const { status } = await authenticatedFetch(other.id, fullURL(page.id, response.id), {
                method: "POST",
                body: JSON.stringify(randomAnswer(response.id)),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            expect(status).toEqual(403);
        });

        it("Is possible to post answer", async () => {

            const [owner, page, response, __] = await setupAnswers();
            const answer = randomAnswer(response.id);

            const fetchResponse = await authenticatedFetch(owner.id, fullURL(page.id, response.id), {
                method: "POST",
                body: JSON.stringify(answer),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const returned = await fetchResponse.json();

            expect(fetchResponse.status).toEqual(201);
            expect(returned.text).toEqual(answer.text);
            expect(returned.response_id).toEqual(answer.response_id)
            expect(answer.id).not.toBeDefined();
            expect(returned.id).toBeDefined();
        });
    });
});