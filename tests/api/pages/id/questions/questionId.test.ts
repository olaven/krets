import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch, uid } from "../../../apiTestUtils";
import questionHandler from "../../../../../src/pages/api/pages/[id]/questions/[questionId]"

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

        for (const method of ["GET", "POST", "PATCH", "HEAD", "OPTIONS"]) {

            const { status } = await fetch(fullURL("somePage", "someQuestion"), { method });
            expect(status).toEqual(405);
        }
    });


    describe("The endpoint for updating pages", async () => {


        it("Does not respond wiht 405", async () => {

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

        it("Does _not_ respond with 401 if authenticated", async () => {

            const { status } = await authenticatedFetch(uid(), fullURL("somePage", "someQuestion"), {
                method: "PUT"
            });
            expect(status).not.toEqual(401);
        });
    });


    describe("The endpoint for deleting pages", async () => {


        it("Does not respond wiht 405", async () => {

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

        it("Does _not_ respond with 401 if authenticated", async () => {

            const { status } = await authenticatedFetch(uid(), fullURL("somePage", "someQuestion"), {
                method: "DELETE"
            });
            expect(status).not.toEqual(401);
        });
    });
});