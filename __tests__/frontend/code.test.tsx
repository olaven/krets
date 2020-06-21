/**
 * @jest-environment jsdom
 */

import React from "react";
import CodePage from "../../src/pages/[pageId]/code"
import * as nextRouter from 'next/router';
import { waitFor, render } from "@testing-library/react"
import { PageModel } from "../../src/models";
import '@testing-library/jest-dom/extend-expect'



//Enzyme.configure({ adapter: new Adapter() });


const mockRouter = (pageId: string) => {
    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
        query: { pageId }
    }));
}

//TODO: use in index.test.tsx as well (shared)
const mockGet = <T extends unknown>(payload: T) => {

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: 200,
            json: () => Promise.resolve(payload)
        } as Response);
    });
}

describe("The QR/code page", () => {

    //NOT relevant, not waiting for result 
    mockGet({})

    it("'loading' while waiting for page", async () => {

        mockRouter("test-id");
        const { container, getByText } = render(<CodePage></CodePage>)
        expect(getByText("(Loading...)")).toBeInTheDocument()
    });

    it("Shows name of the specified page", async () => {

        const mockPage: PageModel = {
            id: "mock-test-page",
            name: "Mocked Test Page",
            owner_id: "owner_id"
        }

        mockRouter(mockPage.id);
        mockGet(mockPage);

        const { getByText } = render(<CodePage />);
        await waitFor(() => {
            expect(getByText(`Scan to give feedback to ${mockPage.name}`)).toBeInTheDocument();
        })
    })
});  