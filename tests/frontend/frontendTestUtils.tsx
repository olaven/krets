import * as nextRouter from 'next/router';
import { ReactElement } from 'react';
import { PageModel } from '../../src/models';
import { PagesContext } from "../../src/context/PagesContext";
import { render } from '@testing-library/react';
import { PageTooltipProvider } from '../../src/components/Home/PageSection/PageSection';


export const renderWithPagesContext = (
    Component: ReactElement,
    pages: PageModel[] = [],
    refreshPages = jest.fn(async () => { })
) => render(<PagesContext.Provider
    value={{
        pages, refreshPages
    }}>
    <PageTooltipProvider pageCount={0}>
        {Component}
    </PageTooltipProvider>
</PagesContext.Provider>);



export const mockRouter = (pageId: string) => {
    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
        query: { pageId }
    }));
}

export const mockFetch = <T extends unknown>(payload: T, status = 200) => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status,
            headers: {
                get: (_: string) => {
                    return "application/json"
                }
            },
            json: () => Promise.resolve(payload)
        } as Response);
    });
}
