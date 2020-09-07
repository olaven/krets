import { Server } from "net";
import fetch from "cross-fetch";
import * as faker from "faker";
import { setupServer, teardownServer } from "../apiTestUtils";
import handler from "../../../src/pages/api/payment/report";

jest.mock("../../../src/auth/auth0");
jest.mock("../../../src/payment/report");

import { reportUsage } from "../../../src/payment/report"


describe("The endpoint for reporting usage to Stripe", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/payment/report");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    describe("Access", () => {

        const reportFetch = (token: string) => fetch(url, {
            method: "POST", headers: {
                authorization: `Bearer: ${token}`
            }
        });

        it("Only allows POST method", async () => {

            for (const method of [
                "GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"
            ]) {

                const { status } = await fetch(url, { method })
                expect(status).toEqual(405);
            }

            const { status } = await fetch(url, { method: "POST" });
            expect(status).not.toEqual(405);
        });

        it("Responds with 401 if no token is provided", async () => {

            const { status } = await fetch(url, { method: "POST" });
            expect(status).toEqual(401);
        });

        it("Responds with 403 if the wrong token is provided", async () => {

            const { status } = await reportFetch(faker.random.uuid());

            expect(status).toEqual(403);
        });

        it("Responds with NO_CONTENT if the correct token was provided", async () => {

            const { status } = await reportFetch(process.env.USAGE_REPORT_SECRET_TOKEN);

            expect(status).toEqual(204)
        });

        it("Does call `reportUsage` on successful call", async () => {

            await reportFetch(process.env.USAGE_REPORT_SECRET_TOKEN);
            expect(reportUsage).toHaveBeenCalled();
        });

        it("Only calls `reportUsage` only once", async () => {

            await reportFetch(process.env.USAGE_REPORT_SECRET_TOKEN);
            expect(reportUsage).toHaveBeenCalledTimes(1);
        });
    });
});