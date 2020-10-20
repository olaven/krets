import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch, uid } from "../../apiTestUtils";
import questionsHandler from '../../../../src/pages/api/pages/[id]/questions';
import { randomQuestion, setupQuestions } from "../../../database/databaseTestUtils";
import { QuestionModel } from "../../../../src/models/models";

jest.mock("../../../../src/auth/auth0");


describe("The endpoint for questions", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string, includeArchived = false) =>
        `${url}/${pageId}/questions?includeArchived=${includeArchived}`;

    beforeAll(async () => {

        [server, url] = await setupServer(questionsHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("Does respond wihth 405 on any method but GET, POST", async () => {

        for (const method of ["PATCH", "HEAD", "PUT", "DELETE", "PATCH"]) {

            const { status } = await fetch(fullURL(uid()), { method });
            expect(status).toEqual(405);
        }
    });

    describe("Retrieving questions by page", () => {

        it("Does respond with _something_", async () => {

            const { status } = await fetch(fullURL(uid()));
            expect(status).toBeDefined();
        });

        it("Allows access even if not authenticated", async () => {

            const { status } = await fetch(fullURL(uid()));
            expect(status).not.toEqual(401)
        });

        it("Returns status code 200 on successful requset", async () => {

            const { status } = await fetch(fullURL(uid()));
            expect(status).toEqual(200);
        });

        it("Returns an array of answers", async () => {

            const [_, page] = await setupQuestions();
            const retrieved = await (await fetch(fullURL(page.id))).json() as QuestionModel[];

            for (const question of retrieved) {

                expect(question.id).toBeDefined();
                expect(question.text).toBeDefined();
                expect(question.page_id).toBeDefined();
            }
        });

        it("Only returns non-archived questions by default", async () => {

            const [_, firstPage] = await setupQuestions(1, false);
            const firstRetrieved = await (await fetch(fullURL(firstPage.id))).json() as QuestionModel[];

            const [__, secondPage] = await setupQuestions(1, true);
            const secondRetrieved = await (await fetch(fullURL(secondPage.id))).json() as QuestionModel[];

            expect(firstRetrieved.length).toEqual(1);
            expect(secondRetrieved.length).toEqual(0);
        });

        it("Only does include archived questions if explicitly asked to", async () => {

            const [_, firstPage] = await setupQuestions(1, true);
            const [question] = await (await fetch(fullURL(firstPage.id, true))).json() as QuestionModel[];

            expect(question.archived).toBe(true);
        });

        it("Does not include archived questions if includeQuestions is false", async () => {

            const [_, firstPage] = await setupQuestions(1, true);
            const [question] = await (await fetch(fullURL(firstPage.id, false))).json() as QuestionModel[];

            expect(question).toBe(undefined);
        });

        it("Only returns questions from given page", async () => {

            const sort = (questions: QuestionModel[]) =>
                questions.sort((a, b) => a.id < b.id ? -1 : 1);

            const [_, firstPage, firstPersisted] = await setupQuestions();
            const [__, secondPage, secondPersisted] = await setupQuestions();

            const firstRetrieved = await (await fetch(fullURL(firstPage.id))).json() as QuestionModel[];
            const secondRetrieved = await (await fetch(fullURL(secondPage.id))).json() as QuestionModel[];

            expect(sort(firstPersisted)).not.toEqual(sort(secondPersisted));
            expect(sort(firstRetrieved)).toEqual(sort(firstPersisted));
            expect(sort(secondRetrieved)).toEqual(sort(secondPersisted));
        });
    });

    describe("Creating new questions on a page", () => {

        const postQuestion = (userId: string, question: QuestionModel, pageId = question.page_id) =>
            authenticatedFetch(userId, fullURL(pageId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(question)
            });

        it("Does respond with _something_", async () => {

            const { status } = await fetch(fullURL(uid()), { method: "POST" });
            expect(status).toBeDefined();
        });

        it("Does returns 401 if not authenticated", async () => {

            const { status } = await fetch(fullURL(uid()), { method: "POST" });
            expect(status).toEqual(401);
        });

        it("Returns 403 if the user does not own the page", async () => {

            const [owner, page] = await setupQuestions();
            const [other] = await setupQuestions();

            const { status } = await postQuestion(other.id, randomQuestion(page.id));
            expect(status).toEqual(403);
        });

        it("Does not persist question if the user does not own the page", async () => {

            const [owner, page] = await setupQuestions();
            const [other] = await setupQuestions();

            const persisted = await (await postQuestion(other.id, randomQuestion(page.id))).text();
            expect(persisted).toBeFalsy();
        });

        it("Returns 201 on successfull request", async () => {

            const [user, page] = await setupQuestions();
            const question = randomQuestion(page.id);

            const { status } = await postQuestion(user.id, question);
            expect(status).toEqual(201);
        });

        it("Does actually result in new question", async () => {

            const [user, page] = await setupQuestions();
            const question = randomQuestion(page.id);
            const persisted = (await (await postQuestion(user.id, question)).json())

            expect(question.id).not.toBeDefined();
            expect(persisted.id).toBeDefined();
            expect(question.text).toEqual(persisted.text);
            expect(question.page_id).toEqual(persisted.page_id);
        });

        it("Responds with 400 if question is malformed", async () => {

            const [user, page] = await setupQuestions();
            const { status } = await postQuestion(user.id, {
                page_id: page.id,
                text: null,
                archived: false,
            });

            expect(status).toEqual(400);
        });

        it("Responds with 403 if user tries to submit question.page_id not corresponding to actual page id", async () => {

            const [user, page] = await setupQuestions();
            const question = randomQuestion(page.id);
            question.page_id = uid()

            expect(question.page_id).not.toEqual(page.id);
            const { status } = await postQuestion(user.id, question, page.id);
            expect(status).toEqual(403);
        });
    });

    /*     
    //TODO: implement PUT and DELETE, but on endpoint for specific question, i.e. /pages/questions/[questionId]
    describe("Updating questions on a page", () => {
    
            it("Does respond with _something_", async () => {
    
                const { status } = await fetch(fullURL(uid()), { method: "PUT" });
                expect(status).toBeDefined();
            });
    
    
            it("Does returns 401 if not authenticated", async () => {
    
                const { status } = await fetch(fullURL(uid()), { method: "PUT" });
                expect(status).toEqual(401);
            });
        });
    
        describe("Deleting questions", async () => {
    
            it("Does respond with _something_", async () => {
    
                const { status } = await fetch(fullURL(uid()), { method: "DELETE" });
                expect(status).toBeDefined();
            });
    
    
            it("Does returns 401 if not authenticated", async () => {
    
                const { status } = await fetch(fullURL(uid()), { method: "DELETE" });
                expect(status).toEqual(401);
            });
        }); */
});