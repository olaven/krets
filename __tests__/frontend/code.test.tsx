/**
 * @jest-environment jsdom
 */

import React from "react";
import CodePage from "../../src/pages/[pageId]/code"
import { waitFor, render } from "@testing-library/react"
import { PageModel } from "../../src/models";
import * as text from "../../src/text"
import '@testing-library/jest-dom/extend-expect'
import { mockGet, mockRouter } from "./frontedTestUtils"

describe("The QR/code page", () => {

    //NOT relevant, not waiting for result 
    mockGet({})

    it("'loading' while waiting for page", async () => {

        mockRouter("test-id");
        const { container, getByText } = render(<CodePage></CodePage>)
        expect(getByText(text.page.loading)).toBeInTheDocument()
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
            expect(getByText(`${text.page.header} ${mockPage.name}`)).toBeInTheDocument();
        })
    })
});  