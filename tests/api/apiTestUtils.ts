import http from 'http'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import { Server } from "net";
import { NextApiHandler } from "next";
import * as faker from "faker";
import fetch from "cross-fetch";
import { PageModel, CategoryModel } from '../../src/models';


//TODO: this is duplicate of function in databaseTestUtils. This should probably be removed in favour of databaseTestUtils-version
export const randomPage = (ownerId: string, color: string = null, categoryId: string = null): PageModel => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    owner_id: ownerId,
    color,
    category_id: categoryId
});



export const postPage = (page: PageModel, url: string, userId: string = uid()) => authenticatedFetch(userId, url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify((page))
});

export const putPage = (page: PageModel, userId: string) => authenticatedFetch(userId, `/api/pages/${page.id}`, {
    method: "PUT",
    headers: {
        "content-type": "application/json",
        body: JSON.stringify(page)
    }
});

export const authenticatedGet = async <T>(userId: string, url: string) => {

    const response = await authenticatedFetch(userId, url);
    expect(response.status).toEqual(200);
    const body = await response.json();
    return body as T;
};

export const postCategory = async (userId: string, url: string, category: CategoryModel) => authenticatedFetch(userId, url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(category)
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
export const authenticatedFetch = (userId: string, url: string, options: any = {}) => {

    const mergedOptions = {
        ...options,
        headers: {
            'x-mock-is-authenticated': userId,
            ...options.headers
        },
    };

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
