import * as faker from "faker";
import * as nextRouter from 'next/router';
import { ReactElement } from 'react';
import { PageModel, UserModel } from '../../../src/models/models';
import { PagesContext } from "../../../src/context/PagesContext";
import { render } from '@testing-library/react';
import { UserContext } from "../../../src/context/UserContext";
import { HomeContext } from "../../../src/context/HomeContext";
import { randomPage } from "../api/apiTestUtils";
import { EmbeddableContext } from "../../../src/context/EmbeddableContext";
import { randomEmbeddable } from "../database/databaseTestUtils";


export const renderWithUserContext = (
    Component: ReactElement,
    user: UserModel
) => render(
    //@ts-expect-error
    <UserContext.Provider value={{
        databaseUser: user //NOTE: only passing what is relevant for now 
    }} >
        {Component}
    </UserContext.Provider >
)

export const renderWithEmbeddableContext = (
    Component: ReactElement,
    embeddable = randomEmbeddable("mock-render-page-id")
) => render(<HomeContext.Provider value={{
    selectedPage: randomPage("mock-render-owner"),
    updatePage: async () => { }, 
    setSelectedPage: () => {}
}}>
    <EmbeddableContext.Provider value={{
        embeddable,
        refreshEmbeddables: async () => { }
    }}>
        {Component}
    </EmbeddableContext.Provider>
</HomeContext.Provider>);


export const renderWithPagesContext = (
    Component: ReactElement,
    pages: PageModel[] = [],
    subscription_id = faker.random.uuid()
) => render(<PagesContext.Provider
    value={{
        pages,
        hasLoaded: false,
        pageLoading: false,
        moreAvailable: true,
        getNextPages: jest.fn(() => { }),
        addPage: jest.fn((page) => { })
    }}>
    <UserContext.Provider
        value={{
            //@ts-expect-error -> NOTE: not passing more context than what is needed. Typechecker should complain about this 
            databaseUser: { subscription_id }
        }}>
        {Component}
    </UserContext.Provider>
</PagesContext.Provider>);


export const renderWithHomeContext = (
Component: ReactElement,
    page = randomPage("mock-render-owner"),
    updatePage = async () => { },
    embeddable = randomEmbeddable("mock-render-page-id")
) => render(<HomeContext.Provider value={{
    selectedPage: page,
    updatePage,
    setSelectedPage: () => {}, 
}}>
    <EmbeddableContext.Provider value={{
        embeddable,
        refreshEmbeddables: async () => { }
    }}>
        {Component}
    </EmbeddableContext.Provider>
</HomeContext.Provider>);




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


