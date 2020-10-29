import * as faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, } from "../../../apiTestUtils";
import embeddableInformationHandler from "../../../../../../src/pages/api/pages/[id]/embeddables/information"
import { randomQuestion, setupEmbeddable, setupPage } from "../../../../database/databaseTestUtils";
import { EmbeddableInformationModel } from "../../../../../../src/models/models";
import { database } from "../../../../../../src/database/database";

jest.mock("../../../../../../src/auth/auth0");

describe("The endpoint for information required fetched by embeddable frontend", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string, token: string) =>
        `${url}/${pageId}/embeddables/information?token=${token}`;

    beforeAll(async () => {

        [server, url] = await setupServer(embeddableInformationHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });
    describe("Getting embeddable information", () => {

        it("Does return status code 200", async () => {

            const [__, page, embeddable] = await setupEmbeddable();
            const { status } = await fetch(fullURL(page.id, embeddable.token));

            expect(status).toEqual(200);
        });

        it("Returns EmbeddableInformationModel", async () => {

            const [__, page, embeddable] = await setupEmbeddable();
            const response = await fetch(fullURL(page.id, embeddable.token));

            const body = await response.json() as EmbeddableInformationModel;
            expect(body.embeddable.id).toBeDefined();
            expect(body.questions).toBeDefined();
        });

        it("Responds with 404 if token does not match", async () => {

            const [__, page, embeddable] = await setupEmbeddable();
            const wrongToken = faker.random.uuid();

            const { status } = await fetch(fullURL(page.id, wrongToken));

            expect(wrongToken).not.toEqual(embeddable.token);
            expect(status).toEqual(404);
        });

        it("Does return 404 if page does not have an embeddable", async () => {

            const [_, page] = await setupPage();

            const embeddable = await database.embeddables.getByPage(page.id)
            expect(embeddable).toBeNull();

            const { status } = await fetch(fullURL(page.id, "just some token"));
            expect(status).toEqual(404);
        });

        it(" Does return questions for the given correct page", async () => {

            const [__, page, embeddable] = await setupEmbeddable();
            const question = await database.questions.createQuestion(randomQuestion(page.id));

            const response = await fetch(fullURL(page.id, embeddable.token));
            const information = (await response.json()) as EmbeddableInformationModel;

            expect(information.questions.length).toEqual(1);
            expect(information.questions[0]).toEqual(question);
        });

        it("Does not return archived questions", async () => {

            const [__, page, embeddable] = await setupEmbeddable();
            await database.questions.createQuestion({
                ...randomQuestion(page.id),
                archived: true
            });

            const response = await fetch(fullURL(page.id, embeddable.token));
            const information = (await response.json()) as EmbeddableInformationModel;


            const allIncludingArchived = await database.questions.getByPage(page.id);

            expect(allIncludingArchived.length).toEqual(1);
            expect(information.questions.length).toEqual(0);
        });

        it("Does return correct embeddable", async () => {

            const [__, page, embeddable] = await setupEmbeddable();

            const response = await fetch(fullURL(page.id, embeddable.token));
            const information = (await response.json()) as EmbeddableInformationModel;

            expect(information.embeddable).toEqual(embeddable);
        });

        it("Does return mandatory or not", async () => {

            const [__, page, embeddable] = await setupEmbeddable();

            const response = await fetch(fullURL(page.id, embeddable.token));
            const information = (await response.json()) as EmbeddableInformationModel;

            expect(information.mandatoryContactDetails).toEqual(page.mandatory_contact_details);
        });
    });

})