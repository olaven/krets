import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../../apiTestUtils";
import lineChartHandler from "../../../../../src/pages/api/pages/[id]/charts/line"
import { users } from "../../../../../src/database/database";
import { randomUser, blindSetup } from "../../../../database/databaseTestUtils";

jest.mock("../../../../../src/auth/auth0");

//TODO: Skipped as not relevant to db work. Unskip once working on API 
describe("The endpoint for average all-time score", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/charts/line`;

    beforeAll(async () => {

        [server, url] = await setupServer(lineChartHandler, "/api/pages");
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
                expect(status).toEqual(400);
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
});