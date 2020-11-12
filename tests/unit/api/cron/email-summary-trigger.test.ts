import * as faker from "faker";
import fetch from "cross-fetch";
import { setupServer, teardownServer } from "../apiTestUtils";
import handler from "../../../../src/pages/api/cron/email-summary-trigger";
import { Server } from "net";
import { FORBIDDEN, NOT_FOUND } from "node-kall";


jest.mock("../../../../src/auth/auth0");

describe("Email Summary API endpont", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        [server, url] = await setupServer(handler, "/api/cron/email-summary-trigger");
    });

    afterAll(async () => {

        await teardownServer(server);
    });

    const trigger = (secret = process.env.EMAIL_SUMMARY_SECRET) =>
        fetch(url, {
            headers: {
                "x-krets-email-summary-secret": secret
            }
        })

    describe("Neccecary test environment", () => {

        it("Does have the secret defined", () => {

            expect(process.env.EMAIL_SUMMARY_SECRET).toBeDefined();
        });
    });

    describe("Access of the endpoint", () => {

        it("is found", async () => {

            const { status } = await fetch(url);
            expect(status).not.toEqual(NOT_FOUND);
        });

        it("Does respond with 403 if not no secret secret is provided", async () => {

            const { status } = await fetch(url);
            expect(status).toEqual(FORBIDDEN);
        });

        it("Does respond wiht 403 if a secret is present, if it is wrong", async () => {

            const token = faker.random.uuid();
            const { status } = await trigger(token);

            expect(status).toEqual(FORBIDDEN);
            expect(token).not.toEqual(process.env.EMAIL_SUMMARY_SECRET);
        });

        it("Does _not_ respond with 403 if the correct secret is present", async () => {

            const { status } = await trigger();
            expect(status).not.toEqual(FORBIDDEN)
        });
    });
});