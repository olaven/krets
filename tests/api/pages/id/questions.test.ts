import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch, uid } from "../../apiTestUtils";
import questionsHandler from '../../../../src/pages/api/pages/[id]/questions';

jest.mock("../../../../src/auth/auth0");


describe("The endpoint for questions", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/questions`;

    beforeAll(async () => {

        [server, url] = await setupServer(questionsHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    it("Does respond wihth 405 on any method but GET, POST, PUT and DELETE", async () => {

        for (const method of ["PATCH", "OPTIONS", "HEAD", "PATCH", uid()]) {

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
    });

    describe("Retrieving creating new questions on a page", () => {

        it("Does respond with _something_", async () => {

            const { status } = await fetch(fullURL(uid()), { method: "POST" });
            expect(status).toBeDefined();
        });

        it("Does returns 401 if not authenticated", async () => {

            const { status } = await fetch(fullURL(uid()), { method: "POST" });
            expect(status).toEqual(401);
        });
    });

    describe("Retrieving updating questions on a page", () => {

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
    });
});