import http from 'http'
import listen from 'test-listen'
import {apiResolver} from 'next/dist/next-server/server/api-utils'
import {Server} from "net";
import {NextApiHandler} from "next";
import {describe, expect, it, test} from "@jest/globals";
import fetch from "isomorphic-unfetch";
import * as faker from "faker";


//TODO: PageId DTO?
export const postBrand = (brand: {id: string, name: string}, url: string, userId: string = uid()) => authenticatedFetch(userId, url,{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify((brand))
});

export const uid = () => faker.random.uuid();

export const getPages = async (url: string, userId = uid()) => {

    const response = await authenticatedFetch(userId, url);
    return response.json();
};


/**
 * Does a fetch with a x-mock-is-authenticated header.
 * This header is compatible with the mock implementation of Auth0
 * @param userId
 * @param url
 * @param options
 */
export const authenticatedFetch = (userId: string, url: string, options: any = {headers: {}}) => {


    const mergedOptions = {
        ...options,
        headers: {
            'x-mock-is-authenticated': userId,
            ...options.headers
        },
    };

    console.log("URL with options: ", url,  options.method);

    return fetch(url, mergedOptions);
};



export const setupServer = async (handler: NextApiHandler, path: string): Promise<[Server, string]> => {

    const server = http.createServer((req, res) =>
        apiResolver(req, res, undefined, handler, undefined));
    const url = (`${await listen(server)}${path}`);
    return [server, url]
};

export const teardownServer = async (server: Server) => {

    await server.close();
};

describe("test test ", () => {

    test("something", () => {

        expect(2).toEqual(2);
    })
});