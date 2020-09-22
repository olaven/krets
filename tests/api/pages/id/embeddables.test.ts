import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../apiTestUtils";
import embeddablesHandler from '../../../../src/pages/api/pages/[id]/embeddables';
import { users, pages, responses } from "../../../../src/database/database";
import { randomUser, randomPage, setupPages } from "../../../database/databaseTestUtils";

jest.mock("../../../../src/auth/auth0");

describe("The endpoint for embeddables", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/embeddables`;

    beforeAll(async () => {

        [server, url] = await setupServer(embeddablesHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    describe("The endpoint in general", () => {

        //THINKABOUT: perhaps PUT is not appropriate for response POSTING (although OK for verification? Not sure)
        it("Only responds to POST and PUT", async () => {

            const [owner, [page]] = await setupPages(1);

            for (const method of [
                "GET", "OPTIONS", "PATCH", "DELETE"
            ]) {

                const { status } = await authenticatedFetch(owner.id, fullURL(page.id), { method });
                expect(status).toEqual(405);
            }
        });

        it("Returns 401 if not authenticated", async () => {

            const [_, [page]] = await setupPages(1);
            const { status } = await fetch(fullURL(page.id), {
                method: "POST"
            });

            expect(status).toEqual(401);
        });
    });

    describe("Creation of embeddables", () => {

        it("Returns 403 if not page owner", async () => {

            const [owner, [page]] = await setupPages(1);
            const [other] = await setupPages(0);

            const { status } = await authenticatedFetch(other.id, fullURL(page.id), {
                method: "POST"
            });

            expect(page.owner_id).toEqual(owner.id);
            expect(owner.id).not.toEqual(other.id);
            expect(status).toEqual(403);
        });

        it("needs more tests", () => {
            throw "implement tests";
        });
    });

    describe("Verification and persisting of responses", () => {

        it("needs more tests", () => {
            throw "implement tests"
        });
    });
});