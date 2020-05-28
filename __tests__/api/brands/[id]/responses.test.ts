import "reflect-metadata";
import fetch from "isomorphic-unfetch";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import {authenticatedFetch, getBrands, postBrand, setupServer, teardownServer, uid} from "../../testutils";
import * as faker from "faker";
import {Server} from "net";
import handler from '../../../../src/pages/api/brands/[id]/responses';
import TypeormConnection from "../../../../src/server/TypeormConnection";


jest.mock("../../../../src/auth/auth0");

describe("The [id] endpoint", () => {

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

    it("Is reached", async () => {

        const handlerMock = jest.fn(handler);

        expect(handlerMock).toHaveBeenCalledTimes(0);
        const response = await fetch(fullURL("somebrand"));
        expect(handlerMock).toHaveBeenCalledTimes(1);
    })
});