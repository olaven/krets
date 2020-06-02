/**
 * @jest-environment jsdom
 */


import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {authenticatedFetch, getPages, postBrand, setupServer, teardownServer, uid} from "../../testutils";
import * as faker from "faker";
import {Server} from "net";
import handler from '../../../../src/pages/api/pages/[id]/responses';
import {ResponseEntity} from "../../../../src/database/remove_typeorm/entities/ResponseEntity";
import {PageEntity} from "../../../../src/database/remove_typeorm/entities/PageEntity";
import {UserEntity} from "../../../../src/database/remove_typeorm/entities/UserEntity";
import {closeConnection, connect} from "../../../../src/database/remove_typeorm/Database";
import {Connection} from "typeorm";


jest.mock("../../../../src/auth/auth0");

describe("The endpoint for responses", () => {

    let server: Server;
    let url: string;
    let connection: Connection;

    const fullURL = (brandId: string) =>
        `${url}/${brandId}/responses`;

    beforeAll(async () => {

        connection = await connect();
        [server, url] = await setupServer(handler, "/api/pages");
    });

    afterAll(async () => {

        await closeConnection();
        await teardownServer(server);
    });


    it("Returns 404 if no responses are found", async () => {


        const full = fullURL(faker.random.uuid());
        const response = await fetch(full);
        expect(response.status).toEqual(404);
    });


    it("Returns 200 with responses if they exist", async () => {

        const userRepository = connection.getRepository(UserEntity);
        const brandRepository = connection.getRepository(PageEntity);
        const responseRepository = connection.getRepository(ResponseEntity);

        const user = await userRepository.save({
            id: faker.random.uuid()
        });

        const brand = await brandRepository.save({
            id: faker.random.words(1),
            name: faker.company.companyName(),
            owner: {
                id: user.id
            }
        });



        await responseRepository.save([
            {
                text: "OK",
                emotion: 'neutral',
                brand
            },
            {
                text: "Good!",
                emotion: 'happy',
                brand
            }
        ]);

        const response = await fetch(fullURL(brand.id));
        expect(response.status).toEqual(200);

        const responses = await response.json();
        expect(responses.length).toEqual(2);
    })
});