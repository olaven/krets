import dns from 'dns'
import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import protectedRoute from '../../src/pages/api/protected';
import {afterAll, beforeAll, describe, expect, test} from "@jest/globals";

describe('Authentication endpoints', () => {

    let server: any;
    let url: string;

    beforeAll(async done => {
        server = http.createServer((req, res) => apiResolver(req, res, undefined, protectedRoute));
        url = await listen(server);
        //@ts-ignore
        done()
    });

    afterAll(done => {
        //@ts-ignore
        server.close(done)
    });

    test('Should return 401 when not authenticated', async () => {

        const response = await fetch(url);
        const content = await response.text();

        expect(response.status).toBe(401);
    });
});