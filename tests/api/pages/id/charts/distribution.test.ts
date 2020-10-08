import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../../apiTestUtils";
import distributionHandler from "../../../../../src/pages/api/pages/[id]/charts/distribution"
import { responses, users } from "../../../../../src/database/database";
import { randomUser, blindSetup, randomResponse, setupPage } from "../../../../database/databaseTestUtils";
import { DistributionModel } from "../../../../../src/models/models";

jest.mock("../../../../../src/auth/auth0");

describe("The endpoint for average all-time score", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/charts/distribution`;

    beforeAll(async () => {

        [server, url] = await setupServer(distributionHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    describe("Security rules of endpoint", () => {

        it("Returns 401 if not authenticated", async () => {

            const [page] = await blindSetup();
            const { status } = await fetch(fullURL(page.id));

            expect(status).toEqual(401);
        });

        it("Responds with 400 if authenticated, but no GET", async () => {

            const [page, user] = await blindSetup();

            for (let method of ["POST", "PUT", "PATCH", "OPTIONS", "HEAD"]) {

                const { status } = await authenticatedFetch(user.id, fullURL(page.id), { method })
                expect(status).toEqual(405);
            }

            const { status } = await authenticatedFetch(user.id, fullURL(page.id), { method: "GET" })
            expect(status).toEqual(200);
        });

        it("Responds with 403 if given user does not own the requested page", async () => {

            const [page, owner] = await blindSetup();
            const other = await users.createUser(randomUser());

            //NOTE: not fethcing as owner, but as other
            const { status } = await authenticatedFetch(other.id, fullURL(page.id));
            expect(status).toEqual(403)
        });
    });

    describe("The returned body", () => {

        const getDistribution = async () => {

            const [page, owner] = await blindSetup();
            const response = await authenticatedFetch(owner.id, fullURL(page.id));
            const parsed = await response.json();
            return parsed as DistributionModel;
        }

        it("Does 200 if OK is the owner", async () => {

            const [page, owner] = await blindSetup();
            const { status } = await authenticatedFetch(owner.id, fullURL(page.id));
            expect(status).toEqual(200);
        });


        it("Responds with valid JSON", async () => {

            const [page, owner] = await blindSetup();
            const response = await authenticatedFetch(owner.id, fullURL(page.id));

            expect(
                response.json()
            ).resolves.not.toThrow();
        });

        it("Returns an object wiht .happy, .neutral and .sad", async () => {

            const distribution = await getDistribution();

            expect(distribution.happy).toBeDefined();
            expect(distribution.neutral).toBeDefined();
            expect(distribution.sad).toBeDefined();
        });

        it(".happy, .neutral and .sad are numeric", async () => {

            const distribution = await getDistribution();

            expect(parseInt(distribution.happy)).not.toBeNaN();
            expect(parseInt(distribution.neutral)).not.toBeNaN();
            expect(parseInt(distribution.sad)).not.toBeNaN();
        });


        it("distribution belongs to the same page as requested", async () => {

            const [page, owner] = await blindSetup();
            const response = await authenticatedFetch(owner.id, fullURL(page.id));
            const distribution = await response.json() as DistributionModel

            expect(distribution.page_id).toEqual(page.id);
        });

        //NOTE: _very_ similar to a test in `responses.test.ts`. Just making sure that nothing breaks in API-step.
        it(" Returns the correct numbers", async () => {

            const [owner, page] = await setupPage();

            //NOTE: three happy
            await responses.createResponse(randomResponse(page.id, ":-)"));
            await responses.createResponse(randomResponse(page.id, ":-)"));
            await responses.createResponse(randomResponse(page.id, ":-)"));

            //NOTE: five neutral
            await responses.createResponse(randomResponse(page.id, ":-|"));
            await responses.createResponse(randomResponse(page.id, ":-|"));
            await responses.createResponse(randomResponse(page.id, ":-|"));
            await responses.createResponse(randomResponse(page.id, ":-|"));
            await responses.createResponse(randomResponse(page.id, ":-|"));

            //NOTE: two sad 
            await responses.createResponse(randomResponse(page.id, ":-("));
            await responses.createResponse(randomResponse(page.id, ":-("));

            const distribution = await (await authenticatedFetch(owner.id, fullURL(page.id))).json();
            expect(distribution.happy).toEqual("3");
            expect(distribution.neutral).toEqual("5");
            expect(distribution.sad).toEqual("2");
        })
    })
});