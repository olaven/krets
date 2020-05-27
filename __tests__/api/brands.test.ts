import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import handler from "../../src/pages/api/brands";
import {Server} from "net";
import TypeormConnection from "../../src/server/TypeormConnection";
import * as faker from "faker";
import {BrandEntity} from "../../src/server/entities/BrandEntity";


const authenticatedFetch = (uid: string, url, options: any = {headers: {}}) =>
    fetch(url, {
        ...options,
        headers: {
            'x-mock-is-authenticated': uid,
            ...options.headers
        },
    });

//TODO: Brand DTO?
const postBrand = (brand: {id: string, name: string}, url: string, userId: string) => authenticatedFetch(userId, url,{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify((brand))
});

const uid = () => faker.random.uuid();

const getBrands = async (url: string, userId = uid()) => {

    const response = await authenticatedFetch(userId, url);
    return response.json();
};

jest.mock("../../src/auth/auth0");

describe("The brand endpoint", () => {

    let server: Server;
    let url: string;

    beforeAll(async () => {

        await TypeormConnection.connect();
        [server, url] = await setupServer(handler, "/api/brands");
    });

    afterAll(async () => {

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

        //NOTE: not including owner
       const brand = {
           id: "my-brand", name: "My Brand"
       };

       const response = await postBrand(brand, url, userId);

       expect(response.status).toEqual(201)
    });

    it("/brands returns all brands belonging to given user", async () => {

        const n = 5;
        const userId = uid();
        const before = await getBrands(url, userId);

        for (let i = 0; i < n; i++) {

            await postBrand({
                id: faker.random.uuid(), name: faker.company.companyName()
            }, url, userId);
        }

        const after = await getBrands(url, userId);
        //expect(before.length).toEqual(0);
        expect(after.length).toEqual(before.length + n);
    });
});