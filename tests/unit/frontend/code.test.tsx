/**
 * @jest-environment jsdom
 */

import React from "react";
import CodePage from "../../../src/pages/[pageId]/code"
import { waitFor, render } from "@testing-library/react"
import { PageModel } from "../../../src/models/models";
import * as text from "../../../src/helpers/text"
import '@testing-library/jest-dom/extend-expect'
import { mockFetch, mockRouter } from "./frontendTestUtils"

describe("The QR/code page", () => {

    //NOT relevant, not waiting for result 
    mockFetch({})

    it("Shows loader while waiting for page", async () => {

        mockRouter("test-id");
        const { container, getByText, getByLabel } = render(<CodePage></CodePage>)
        expect(getByLabel("loader-label")).toBeInTheDocument()
    });

    it("Shows name of the specified page", async () => {

        const mockPage: PageModel = {
            id: "mock-test-page",
            name: "Mocked Test Page",
            owner_id: "owner_id"
        }

        mockRouter(mockPage.id);
        mockFetch(mockPage);

        const { getByText } = render(<CodePage />);
        await waitFor(() => {
            expect(getByText(`${text.page.header} ${mockPage.name}`)).toBeInTheDocument();
        })
    })
});  