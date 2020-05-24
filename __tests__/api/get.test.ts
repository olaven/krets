import dns from 'dns'
import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import {
    apiResolver
} from 'next/dist/next-server/server/api-utils'
import handler from '../../src/pages/api/test';
import {afterAll, beforeAll, describe, expect, test} from "@jest/globals";

describe('Testin endpoints', () => {

    let server: any;
    let url: string;

    beforeAll(async done => {
        server = http.createServer((req, res) => apiResolver(req, res, undefined, handler));
        url = await listen(server);
        //@ts-ignore
        done()
    });

    afterAll(done => {
        //@ts-ignore
        server.close(done)
    });

    test('Should return 200 informing internet status if OK', async () => {
        // dns.promises.lookup.mockReset();
        const response = await fetch(url);
        const content = await response.text();

        expect(response.status).toBe(200);
        expect(content).toMatch("Hello, test")
    });
});