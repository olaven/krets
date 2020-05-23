import dns from 'dns'
import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import {
    apiResolver
} from 'next/dist/next-server/server/api-utils'
import handler from '../../src/pages/api/test.js';

describe('Testin endpoints', () => {
    let server
    let url

    beforeAll(async done => {
        server = http.createServer((req, res) => apiResolver(req, res, undefined, handler))
        url = await listen(server)
        done()
    })

    afterAll(done => {
        server.close(done)
    })

    test('Should return 200 informing internet status if OK', async () => {
        // dns.promises.lookup.mockReset();
        const response = await fetch(url)
        const content = await response.text()

        expect(response.status).toBe(200)
        expect(content).toMatch("Hello, test")
    })
});