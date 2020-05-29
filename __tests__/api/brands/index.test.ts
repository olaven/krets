import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {authenticatedFetch, getBrands, postBrand, setupServer, teardownServer, uid} from "../testutils";
import handler from "../../../src/pages/api/brands";
import {Server} from "net";
import DatabaseConnection from "../../../src/server/DatabaseConnection";
import * as faker from "faker";
import {UserEntity} from "../../../src/server/entities/UserEntity";

jest.mock("../../../src/auth/auth0");

describe("The brands endpoint", () => {

    let server: Server;
    let url: string;
    let userRepository;

    beforeAll(async () => {

        await DatabaseConnection.connect();
        userRepository = (await DatabaseConnection.get()).getRepository(UserEntity);
        [server, url] = await setupServer(handler, "/api/brands");
    });

    afterAll(async () => {

        await DatabaseConnection.close();
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

    it("Is possible to create brand if authenticated", async () => {

        const userId = uid();
        await userRepository.save({
            id: userId
        });

       const response = await postBrand({
           id: "my-brand", name: "My Brand"
       }, url, userId);

       expect(response.status).toEqual(201)
    });

    it("/brands returns all brands belonging to given user", async () => {

        const n = 5;
        const user = await userRepository.save({
            id: uid()
        });

        const before = await getBrands(url, user.id);

        for (let i = 0; i < n; i++) {

            await postBrand({
                id: faker.random.uuid(), name: faker.company.companyName()
            }, url, user.id);
        }

        const after = await getBrands(url, user.id);
        //expect(before.length).toEqual(0);
        expect(after.length).toEqual(before.length + n);
    });
});