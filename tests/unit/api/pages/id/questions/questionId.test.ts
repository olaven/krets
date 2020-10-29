import * as faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch, uid } from "../../../apiTestUtils";
import questionHandler from "../../../../../src/pages/api/pages/[id]/questions/[questionId]"
import { QuestionModel } from "../../../../../src/models/models";
import { setupQuestions } from "../../../../database/databaseTestUtils";
import { database } from "../../../../../src/database/database";

jest.mock("../../../../../src/auth/auth0");

describe("The endpoint for average all-time score", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string, questionId: string) =>
        `${url}/${pageId}/questions/${questionId}`;

    beforeAll(async () => {

        [server, url] = await setupServer(questionHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("Does not respond to methods other than PUT and DELETE", async () => {

        for (const method of ["GET", "POST", "PATCH", "HEAD"]) {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), { method });
            expect(status).toEqual(405);
        }
    });


    describe("The endpoint for deleting pages", () => {

        const putQuestion = (ownerId: string, question: QuestionModel, pageId = question.page_id, questionId = question.id) => authenticatedFetch(
            ownerId,
            fullURL(pageId, questionId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        });

        it("Does not respond with 405", async () => {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), {
                method: "PUT"
            });
            expect(status).not.toEqual(405);
        });

        it("Does respond with 401 if not authenticated", async () => {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), {
                method: "PUT"
            });

            expect(status).toEqual(401);
        });

        it("Returns 204 on successful request", async () => {

            const [owner, _, [question]] = await setupQuestions();
            const { status } = await putQuestion(owner.id, question);

            expect(status).toEqual(204);
        });

        it("Actually updates on succesful request", async () => {

            const [owner, _, [question]] = await setupQuestions();
            const before = await database.questions.getQuestion(question.id);
            await putQuestion(owner.id, {
                ...question,
                text: faker.lorem.word()
            });
            const after = await database.questions.getQuestion(question.id);
            //TODO 
            expect(before.id).toEqual(after.id);
            expect(before.page_id).toEqual(after.page_id);
            expect(before.text).not.toEqual(after.text);
        });

        it("Can update `archived` through put request", async () => {

            const [owner, _, [question]] = await setupQuestions();
            const before = await database.questions.getQuestion(question.id);
            await putQuestion(owner.id, {
                ...question,
                archived: !question.archived
            });
            const after = await database.questions.getQuestion(question.id);

            //TODO 
            expect(before.id).toEqual(after.id);
            expect(before.archived).toBeDefined();
            expect(after.archived).toBeDefined();
            expect(before.archived).not.toEqual(after.archived);
        });

        it("Returns 400 if question page is not the same as actual page", async () => {

            const [owner, page, [question]] = await setupQuestions();
            question.page_id = uid();

            expect(question.page_id).not.toEqual(page.id);

            const { status } = await putQuestion(owner.id, question, page.id);
            expect(status).toEqual(400);
        });

        it("returns 400 if given question id does not match actual question", async () => {

            const [owner, page, [question, otherQuestion]] = await setupQuestions(2);
            const { status } = await putQuestion(owner.id, question, page.id, otherQuestion.id);

            expect(status).toEqual(400);
        });

        it("Returns 403 if user is not the page owner", async () => {

            const [_, __, [question]] = await setupQuestions();
            const [other] = await setupQuestions();

            const { status } = await putQuestion(other.id, question);
            expect(status).toEqual(403);
        });
    });


    //TODO: This endpoint is not fully implemented
    describe("The endpoint for deleting pages", () => {

        const deleteQuestion = (ownerId: string, question: QuestionModel, pageId = question.page_id, questionId = question.id) =>
            authenticatedFetch(ownerId, fullURL(pageId, questionId), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(question)
            });
        it("Does not respond with 405", async () => {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), {
                method: "DELETE"
            });
            expect(status).not.toEqual(405);
        });

        it("Does respond with 401 if not authenticated", async () => {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), {
                method: "DELETE"
            });

            expect(status).toEqual(401);
        });

        it("Returns 200 on succesful deletion", async () => {

            const [owner, _, [question]] = await setupQuestions();
            const { status } = await deleteQuestion(owner.id, question);

            expect(status).toEqual(200);
        });

        it("Returns deleted question on succesful deletion", async () => {

            const [owner, _, [question]] = await setupQuestions();
            const retrieved = await (await deleteQuestion(owner.id, question)).json();

            expect(retrieved).toEqual(question);
        });

        it("Actually deletes", async () => {

            const [owner, _, [question]] = await setupQuestions();

            const before = await database.questions.getQuestion(question.id);
            await deleteQuestion(owner.id, question);
            const after = await database.questions.getQuestion(question.id);

            expect(before).toBeDefined();
            expect(before).toEqual(question);

            expect(after).toBeNull();
        });


        it("only deletes that single question", async () => {

            const [owner, _, [firstQuestion, secondQuestion]] = await setupQuestions(2);
            await deleteQuestion(owner.id, firstQuestion);

            const firstAfter = await database.questions.getQuestion(firstQuestion.id);
            const secondAfter = await database.questions.getQuestion(secondQuestion.id);

            expect(firstAfter).toBeNull();
            expect(secondAfter).not.toBeNull();
            expect(secondAfter).toEqual(secondQuestion);
        });


        it("Returns 400 if question page is not the same as actual page", async () => {

            const [owner, page, [question]] = await setupQuestions();
            question.page_id = uid();

            expect(question.page_id).not.toEqual(page.id);

            const { status } = await deleteQuestion(owner.id, question, page.id);
            expect(status).toEqual(400);
        });

        it("returns 400 if given question id does not match actual question", async () => {

            const [owner, page, [question, otherQuestion]] = await setupQuestions(2);
            const { status } = await deleteQuestion(owner.id, question, page.id, otherQuestion.id);

            expect(status).toEqual(400);
        });

        it("Returns 403 if user is not the page owner", async () => {

            const [_, __, [question]] = await setupQuestions();
            const [other] = await setupQuestions();

            const { status } = await deleteQuestion(other.id, question);
            expect(status).toEqual(403);
        });
    });
});