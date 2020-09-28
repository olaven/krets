import * as faker from "faker";
import { Server } from "net";
import fetch from "cross-fetch";
import { setupServer, teardownServer, authenticatedFetch } from "../../../apiTestUtils";
import countHandler from '../../../../../src/pages/api/pages/[id]/responses/count';
import { blindSetup } from "../../../../database/databaseTestUtils";

jest.mock("../../../../../src/auth/auth0");

describe("The endpoint for answers on a given response", () => {

    let server: Server;
    let url: string;

    const fullURL = (pageId: string) =>
        `${url}/${pageId}/responses/count`;

    beforeAll(async () => {

        [server, url] = await setupServer(countHandler, "/api/pages");
    });

    afterAll(async () => {

        await teardownServer(server);
    });


    describe("The endpont for getting response count", () => {

        it("Responds with 401 if not authenticated", async () => {

            const [page] = await blindSetup();
            const { status } = await fetch(fullURL(page.id));
            expect(status).toEqual(401);
        });

        it("Responds with 403 if not owner of the page", async () => {

            const [page, owner] = await blindSetup();
            const [_, other] = await blindSetup();

            const { status } = await authenticatedFetch(other.id, fullURL(page.id));

            expect(owner.id).not.toEqual(other.id);
            expect(status).toEqual(403);
        });

        it("Responds with an object having `.count`", async () => {

            const [page, owner] = await blindSetup();
            const response = await authenticatedFetch(owner.id, fullURL(page.id));

            const body = await response.json();
            expect(body.count).toBeDefined();
            expect(parseInt(body.count)).not.toBeNaN();
        });

        it("Returns the correct count", async () => {

            const n = faker.random.number({ min: 2, max: 15 });
            const [page, owner] = await blindSetup(n);

            const response = await authenticatedFetch(owner.id, fullURL(page.id));
            const body = await response.json();
            expect(body.count).toEqual(n);
        });
    });
});