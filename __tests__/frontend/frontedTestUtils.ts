import * as nextRouter from 'next/router';

export const mockRouter = (pageId: string) => {
    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
        query: { pageId }
    }));
}

//TODO: use in index.test.tsx as well (shared)
export const mockGet = <T extends unknown>(payload: T) => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve(payload)
        } as Response);
    });
}


describe("test test ", () => {

    test("something", () => {

        expect(2).toEqual(2);
    })
});