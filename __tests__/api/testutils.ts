import http from 'http'
import listen from 'test-listen'
import {apiResolver} from 'next/dist/next-server/server/api-utils'
import {Server} from "net";
import {NextApiHandler} from "next";
import {describe, expect, it, test} from "@jest/globals";

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
})