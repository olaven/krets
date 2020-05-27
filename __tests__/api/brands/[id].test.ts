import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {postBrand, setupServer, teardownServer, uid} from "../testutils";
import handler from "../../../src/pages/api/brands/[id]";
import * as faker from "faker";
import TypeormConnection from "../../../src/server/TypeormConnection";

describe("Endpoint for getting a specific brand", () => {


    let server;
    let bareUrl;

    const url = (brandId) =>
        `${bareUrl}${brandId}`;

    beforeAll(async () => {

        await TypeormConnection.connect();
        //NOTE: URL does not include [id] - must be added in tests
       [server, bareUrl] = await setupServer(handler, "/api/brands/")
    });

    afterAll(async () => {

        await TypeormConnection.close();
        await teardownServer(server)
    });

    it("Returns 200 if brand exists, if not authenticated", async () => {

        const brandId = uid();
        const postResponse = await postBrand({name: faker.company.companyName(), id: brandId}, bareUrl);
        expect(postResponse.status).toEqual(201);

        const getResponse = await fetch(url(brandId));
        expect(getResponse.status).toEqual(200);
    });

    it("Returns 404 if brand does not exists, if not authenticated", () => {

        throw "NOT IMPLEMENTED"
    });

    it("Returns 200 if brand exists, if authenticated", () => {

        throw "NOT IMPLEMENTED"
    });

    it("Returns 404 if brand does not exists, if authenticated", () => {

        throw "NOT IMPLEMENTED"
    });
});