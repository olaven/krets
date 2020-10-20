import * as faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, randomEmbeddableResponse } from "../../../apiTestUtils";
import embeddableInformationHandler from "../../../../../src/pages/api/pages/[id]/embeddables/responses"
import { setupEmbeddable, setupPages } from "../../../../database/databaseTestUtils";
import { EmbeddableResponseModel, PageModel } from "../../../../../src/models/models";

describe("Verification and persisting of responses", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/embeddables/responses`;

    beforeAll(async () => {

        [server, url] = await setupServer(embeddableInformationHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    const postEmbeddableResponse = (page: PageModel, embeddableResponse: EmbeddableResponseModel) =>
        fetch(fullURL(page.id), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embeddableResponse)
        });

    it("Does _not_ respond with 401 if not authenticated ", async () => {

        const [_, page, embeddable] = await setupEmbeddable();
        const { status } = await postEmbeddableResponse(page,
            randomEmbeddableResponse(page.id, embeddable.token)
        );

        expect(status).not.toEqual(401);
    });

    it("It returns 201 on succesful request", async () => {

        const [_, page, embeddable] = await setupEmbeddable();
        const { status } = await postEmbeddableResponse(
            page, randomEmbeddableResponse(page.id, embeddable.token)
        );
        expect(status).toEqual(201)
    });

    it("Returns 404 if no embeddable with provided token exists", async () => {

        const [_, [page]] = await setupPages(1);
        const token = faker.random.uuid();
        const { status } = await postEmbeddableResponse(page,
            randomEmbeddableResponse(page.id, token)
        );

        expect(status).toEqual(404);
    });

    it("Does not accept a wrong token", async () => {

        const [_, page, embeddable] = await setupEmbeddable();
        const providedToken = faker.random.uuid();

        const embeddableResponse = randomEmbeddableResponse(page.id, providedToken);

        expect(embeddableResponse.answers).not.toContain(null);

        const { status } = await postEmbeddableResponse(page, embeddableResponse);

        expect(providedToken).not.toEqual(embeddable.token);
        expect(status).toEqual(404);
    });

    it("Does not accept a wrong page / embeddable match ", async () => {

        const [__, page, embeddable] = await setupEmbeddable();
        const [_, [otherPage]] = await setupPages(1);

        const embeddableResponse = randomEmbeddableResponse(otherPage.id, embeddable.token);
        const { status } = await postEmbeddableResponse(page, embeddableResponse);

        expect(otherPage.id).not.toEqual(page.id);
        expect(status).toEqual(400);
    });
});