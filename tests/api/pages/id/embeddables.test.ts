import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../apiTestUtils";
import embeddablesHandler from '../../../../src/pages/api/pages/[id]/embeddables';
import { setupPages, randomEmbeddable } from "../../../database/databaseTestUtils";
import { EmbeddableModel, PageModel } from "../../../../src/models/models";

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
        it("Only responds to GET, POST and PUT", async () => {

            const [owner, [page]] = await setupPages(1);

            for (const method of [
                "PATCH", "DELETE"
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

        const postEmbeddable = (page: PageModel, embeddable: EmbeddableModel) =>
            authenticatedFetch(page.owner_id, fullURL(page.id), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(embeddable)
            });

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

        it("Returns 201 on succesful creation", async () => {

            const [owner, [page]] = await setupPages(1);
            const { status } = await postEmbeddable(page, randomEmbeddable(page.id));
            expect(status).toEqual(201);
        });

        it("Returns the embeddable in response body on succesful creation ", async () => {

            const [owner, [page]] = await setupPages(1);

            const embeddable = randomEmbeddable(page.id);
            const response = await postEmbeddable(page, embeddable);
            const retrieved = await response.json();

            expect(retrieved.page_id).toEqual(embeddable.page_id);
        });
        it("Does not accept embeddable if page_id is not defined", async () => {

            const [_, [page]] = await setupPages(1);

            const { status } = await postEmbeddable(page, { page_id: undefined });
            expect(status).toEqual(400);
        });


    });
});