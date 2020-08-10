import { setupServer, teardownServer, uid } from "../../apiTestUtils";
import * as faker from "faker";
import { Server } from "net";
import handler from '../../../../src/pages/api/pages/[id]/responses';
import { users, pages, responses } from "../../../../src/database/database";
import fetch from "cross-fetch";
import { randomUser, randomPage, randomResponse } from "../../../database/databaseTestUtils";

jest.mock("../../../../src/auth/auth0");

describe("The endpoint for responses", () => {

    let server: Server;
    let url: string;

    const fullURL = (brandId: string) =>
        `${url}/${brandId}/responses`;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });


    it("Returns 404 if no responses are found", async () => {


        const full = fullURL(faker.random.uuid());
        const response = await fetch(full);
        expect(response.status).toEqual(404);
    });


    it("Returns 200 with responses if they exist", async () => {

        const user = await users.createUser(randomUser());

        const page = await pages.createPage({
            id: faker.random.uuid(),
            name: faker.company.companyName(),
            owner_id: user.id
        });

        await responses.createResponse({
            text: "OK",
            emotion: ':-|',
            page_id: page.id
        });

        await responses.createResponse({
            text: "Good!",
            emotion: ':-)',
            page_id: page.id
        });

        const fetchResponse = await fetch(fullURL(page.id));
        expect(fetchResponse.status).toEqual(200);

        const receivedResponses = await fetchResponse.json();
        expect(receivedResponses.length).toEqual(2);
    });

    it("is possible to create a response", async () => {

        const user = await users.createUser(randomUser());

        const page = await pages.createPage({
            id: faker.random.uuid(),
            name: faker.company.companyName(),
            owner_id: user.id,
            category_id: null
        });

        const response = {
            text: "OK",
            emotion: ':-|',
            page_id: page.id
        };

        const fetchResponse = await fetch(fullURL(page.id), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(response)
        });

        // Correct response 
        expect(fetchResponse.status).toEqual(201);


        const retrievedResponses = await (await fetch(fullURL(page.id))).json();
        const hasCorrect = retrievedResponses.find(r =>
            r.text === response.text &&
            r.emotion === response.emotion &&
            r.page_id === response.page_id)

        expect(hasCorrect).toBeTruthy();
    });


    it("Is possible to have the response contain contact details", async () => {

        const user = await users.createUser(randomUser());
        const page = await pages.createPage(randomPage(user.id));
        const contactDetails = faker.internet.email();

        const response = await randomResponse(page.id, ":-|", contactDetails);

        const before = await responses.getResponses(page.id);
        const { status } = await fetch(fullURL(page.id), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(response)
        });

        expect(status).toEqual(201);

        const after = await responses.getResponses(page.id);
        expect(before.length).toEqual(0);
        expect(after.length).toEqual(1);

        const [retrievedResponse] = after;
        expect(retrievedResponse.contact_details).toEqual(contactDetails);
    })
});