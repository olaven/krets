import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {setupServer, teardownServer} from "./testutils";
import handler from "../../src/pages/api/brands";
import {Server} from "net";
import TypeormConnection, {getPostgresConnection} from "../../src/server/TypeormConnection";
import {BrandEntity} from "../../src/server/entities/BrandEntity";


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


        const response = await fetch(url, {
            headers: {
                'x-mock-is-authenticated': "true"
            }
        });
        expect(response.status).toEqual(401);
    });

    it("does give access when user is authenticated", async () => {

        const response = await fetch(url);
        expect(response.status).toEqual(200);
    });

    it("Is possible to create brand if authenticated", async () => {

        //NOTE: not including owner
       const brand = {
           id: "my-brand", name: "My Brand"
       };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'x-mock-is-authenticated': "true"
            },

            body: (await JSON.stringify(brand))
        });

       expect(response.status).toEqual(201)

    });
});