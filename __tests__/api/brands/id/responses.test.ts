import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {authenticatedFetch, getBrands, postBrand, setupServer, teardownServer, uid} from "../../testutils";
import * as faker from "faker";
import {Server} from "net";
import handler from '../../../../src/pages/api/brands/[id]/responses';
import TypeormConnection from "../../../../src/server/TypeormConnection";
import {ResponseEntity} from "../../../../src/server/entities/ResponseEntity";
import {BrandEntity} from "../../../../src/server/entities/BrandEntity";


jest.mock("../../../../src/auth/auth0");

describe("The endpoint for responses", () => {

    let server: Server;
    let url: string;

    const fullURL = (brandId: string) =>
        `${url}/${brandId}/responses`;

    beforeAll(async () => {

        await TypeormConnection.connect();
        [server, url] = await setupServer(handler, "/api/brands");
    });

    afterAll(async () => {

        await TypeormConnection.close();
        await teardownServer(server);
    });


    it("Returns 404 if no responses are found", async () => {


        const full = fullURL(faker.random.uuid());
        const response = await fetch(full);
        expect(response.status).toEqual(404);
    });


    it("Returns 200 with responses if they exist", async () => {

        const brandRepository = TypeormConnection.connection.getRepository(BrandEntity);
        const responseRepository = TypeormConnection.connection.getRepository(ResponseEntity);

        const brandId = faker.random.uuid();
        await brandRepository.save({
            id: brandId,
            name: faker.company.companyName(),
            ownerId: faker.random.uuid()
        });

        await responseRepository.save([
            {
                text: "OK",
                emotion: 'neutral',
                brandId: brandId
            },
            {
                text: "Good!",
                emotion: 'happy',
                brandId: brandId
            }
        ]);



        const response = await fetch(fullURL(brandId));
        expect(response.status).toEqual(200);

        const responses = await response.json();
        expect(responses.length).toEqual(2);
    })
});