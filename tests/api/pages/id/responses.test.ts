import { authenticatedFetch, setupServer, teardownServer } from "../../apiTestUtils";
import * as faker from "faker";
import { Server } from "net";
import handler from '../../../../src/pages/api/pages/[id]/responses';
import { database } from "../../../../src/database/database";
import fetch from "cross-fetch";
import { randomUser, randomPage, randomResponse, blindSetup, setupPage, randomAnswer } from "../../../database/databaseTestUtils";
import { PaginatedModel, ResponseAnswerModel, ResponseModel } from "../../../../src/models/models";

jest.mock("../../../../src/auth/auth0");

describe("The endpoint for responses", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string, paginationKey: string = null) =>
        `${url}/${pageId}/responses?key=${paginationKey}`;


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

        const user = await database.users.createUser(randomUser());

        const page = await database.pages.createPage({
            id: faker.random.uuid(),
            name: faker.company.companyName(),
            owner_id: user.id,
            mandatory_contact_details: false
        });

        await database.responses.createResponse({
            emotion: ':-|',
            page_id: page.id
        });

        await database.responses.createResponse({
            emotion: ':-)',
            page_id: page.id
        });

        const fetchResponse = await fetch(fullURL(page.id));
        expect(fetchResponse.status).toEqual(200);

        const receivedResponses = (await fetchResponse.json()).data;
        expect(receivedResponses.length).toEqual(2);
    });

    describe("Response creation", () => {

        const randomPayload = (pageId: string, answerCount = faker.random.number({ min: 0, max: 5 })) => {

            const response = randomResponse(pageId);

            //NOTE: should have been done functionally, but Jest does not appear to work well with it 
            const answers = [];
            for (let i = 0; i < answerCount; i++) {

                answers.push(
                    randomAnswer(response.id)
                )
            }

            return {
                response,
                answers
            }
        }

        const postResponse = (payload: ResponseAnswerModel, pageId = payload.response.page_id) =>
            fetch(fullURL(pageId), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

        describe("setup of `mandatory_contact_details` with `setupPages` - test utils", () => {

            it("Does not crash", () => {

                expect(setupPage()).resolves.not.toThrow();
            });

            it("Creates a non-mandatory page by default", async () => {

                const [_, page] = await setupPage();
                expect(page.mandatory_contact_details).toBe(false);
            });

            it("Creates a non-mandatory page if `false` is passed as arg", async () => {

                const [_, page] = await setupPage(false);
                expect(page.mandatory_contact_details).toBe(false);
            });

            it("Creates a mandatory page if `true` is passed as arg", async () => {

                const [_, page] = await setupPage(true);
                expect(page.mandatory_contact_details).toBe(true);
            });
        })

        it("is possible to create a response", async () => {

            const user = await database.users.createUser(randomUser());

            const page = await database.pages.createPage({
                id: faker.random.uuid(),
                name: faker.company.companyName(),
                owner_id: user.id,
                category_id: null,
                mandatory_contact_details: false
            });

            const response: ResponseModel = {
                emotion: ':-|',
                page_id: page.id
            };

            const fetchResponse = await postResponse({
                response,
                answers: [],
            });

            // Correct response 
            expect(fetchResponse.status).toEqual(201);


            const retrievedResponses = (await (await fetch(fullURL(page.id))).json()).data;
            const hasCorrect = retrievedResponses.find(r =>
                r.emotion === response.emotion &&
                r.page_id === response.page_id)

            expect(hasCorrect).toBeTruthy();
        });


        it("Is possible to have the response contain contact details", async () => {

            const user = await database.users.createUser(randomUser());
            const page = await database.pages.createPage(randomPage(user.id));
            const contactDetails = faker.internet.email();

            const response = randomResponse(page.id, ":-|", contactDetails);

            const before = await database.responses.getResponses(page.id);
            const { status } = await postResponse({
                response,
                answers: [],
            });

            expect(status).toEqual(201);

            const after = await database.responses.getResponses(page.id);
            expect(before.length).toEqual(0);
            expect(after.length).toEqual(1);

            const [retrievedResponse] = after;
            expect(retrievedResponse.contact_details).toEqual(contactDetails);
        });

        it(" Does not allow creation of a response with bad id", async () => {

            const id = faker.random.uuid();
            const page = await database.pages.getPage(id);
            expect(page).toEqual(null);

            const response = randomResponse(id, ":-)", undefined);

            const { status } = await postResponse({ response, answers: [] });
            expect(status).toEqual(400);
        });

        it("Does not allow creation without contact_details _if it is marked as mandatory_", async () => {


            const [_, page] = await setupPage(true);
            const response = randomResponse(page.id, ":-)", undefined);

            const { status } = await postResponse({ response, answers: [] });

            expect(page.mandatory_contact_details).toBe(true);
            expect(response.contact_details).toBeUndefined();
            expect(status).toEqual(400);
        });

        it("Does allow responses without contact details if mandatoryis false", async () => {

            const [_, page] = await setupPage(false);

            const response = randomResponse(page.id, ":-)", undefined);
            const { status } = await postResponse({ response, answers: [] });

            expect(status).toEqual(201);
            expect(page.mandatory_contact_details).toBe(false);
            expect(response.contact_details).toBeUndefined();
        });

        it("Does allow creation with contact details when contact details are mandatory", async () => {

            const [_, page] = await setupPage(true);
            const response = randomResponse(page.id, ":-|", faker.internet.email());
            const { status } = await postResponse({ response, answers: [] });

            expect(status).toEqual(201);
        });


        it("Persisted response actually has contact details ", async () => {

            const [_, page] = await setupPage(true);
            const contactDetails = faker.internet.email();

            const persisted = (await (await postResponse({
                response: randomResponse(page.id, ":-|", contactDetails),
                answers: []
            })).json());

            expect(persisted.contact_details).toEqual(contactDetails);
        });

        it(" Accepts answers in same request as reponse", async () => {

            const [_, page] = await setupPage()
            const r = await postResponse(
                randomPayload(page.id, 3),
            )

            expect(r.status).toEqual(201);
        });

        it("Does persist given responses", async () => {

            const [_, page] = await setupPage();
            const before = randomAnswer(page.id);

            const r = await postResponse({
                response: randomResponse(page.id),
                answers: [before]
            });

            const response = await r.json() as ResponseModel;
            const [after] = await database.answers.getByResponse(response.id);

            //i.e. found the same text in database after posting 
            expect(after.text).toEqual(after.text);
        });
    });



    describe("Pagination functionality", () => {

        it("Has a page size of 10", async () => {

            const [page, user, persisted] = await blindSetup(15);

            const response = await authenticatedFetch(user.id, fullURL(page.id))
            const retrieved = (await response.json()).data;

            expect(retrieved.length).toEqual(10) //NOTE: 15 was persisted
        });

        it("Returns persisted _after_ given key", async () => {

            const [page, user, persisted] = await blindSetup(15);
            const [excluded, firstExpected] = persisted;

            expect(excluded.created_at).not.toContain("GMT");
            const response = await authenticatedFetch(user.id, fullURL(page.id, excluded.created_at));
            const [firstRetrieved] = ((await response.json()).data) as ResponseModel[];

            expect(firstRetrieved.id).toEqual(firstExpected.id);
        });


        it("Returns responses wrapped in a PaginationModel", async () => {

            const [page, user] = await blindSetup();
            const response = await authenticatedFetch(user.id, fullURL(page.id));
            const pagiantedModel = await response.json() as PaginatedModel<ResponseModel>;


            expect(pagiantedModel.data).toBeDefined();
            expect(pagiantedModel.next).toBeDefined();
        });
    });
});