import * as nextRouter from 'next/router';
import { ReactElement } from 'react';
import { PageModel } from '../../src/models';
import { PagesContext } from "../../src/context/PagesContext";
import { render } from '@testing-library/react';


export const renderWithPagesContext = (
    Component: ReactElement,
    pages: PageModel[] = [],
    refreshPages = jest.fn(async () => { })
) => render(<PagesContext.Provider
    value={{
        pages, refreshPages
    }}>
    {Component}
</PagesContext.Provider>);



export const mockRouter = (pageId: string) => {
    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
        query: { pageId }
    }));
}

export const mockGet = <T extends unknown>(payload: T) => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve(payload)
        } as Response);
    });
}
