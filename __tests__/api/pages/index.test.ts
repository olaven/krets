import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {authenticatedFetch, getPages, postBrand, setupServer, teardownServer, uid} from "../testutils";
import handler from "../../../src/pages/api/pages";
import {Server} from "net";
import * as faker from "faker";
import {UserEntity} from "../../../src/database/entities/UserEntity";
import {closeConnection, connect} from "../../../src/database/Database";

jest.mock("../../../src/auth/auth0");

describe("The pages endpoint", () => {

    let server: Server;
    let url: string;
    let userRepository;

    beforeAll(async () => {

        const connection = await connect();
        userRepository = connection.getRepository(UserEntity);
        [server, url] = await setupServer(handler, "/api/pages");
    });

    afterAll(async () => {

        await closeConnection();
        await teardownServer(server);
    });

    it("does not give access when user is not authenticated", async () => {

        const response = await fetch(url, {});
        expect(response.status).toEqual(401);
    });

    it("does give access when user is authenticated", async () => {

        const response = await authenticatedFetch(uid(), url);
        expect(response.status).toEqual(200);
    });

    it("Is possible to create a page if authenticated", async () => {

        const userId = uid();
        await userRepository.save({
            id: userId
        });

       const response = await postBrand({
           id: "my-page", name: "My Page"
       }, url, userId);

       expect(response.status).toEqual(201)
    });

    it("/pages returns all pages belonging to given user", async () => {

        const n = 5;
        const user = await userRepository.save({
            id: uid()
        });

        const before = await getPages(url, user.id);

        for (let i = 0; i < n; i++) {

            await postBrand({
                id: faker.random.uuid(), name: faker.company.companyName()
            }, url, user.id);
        }

        const after = await getPages(url, user.id);
        //expect(before.length).toEqual(0);
        expect(after.length).toEqual(before.length + n);
    });
});