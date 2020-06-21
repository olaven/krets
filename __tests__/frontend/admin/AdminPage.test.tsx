/**
 * @jest-environment jsdom
 */

import React from "react";
import { AdminPage } from "../../../src/components/Admin/AdminPage"
import { waitFor, render } from "@testing-library/react"
import { PageModel } from "../../../src/models";
import * as text from "../../../src/text"
import '@testing-library/jest-dom/extend-expect'


describe("Admin page", () => {

    it("Displays message about loading", () => {

        const { getByText } = render(<AdminPage />);
        expect(getByText(text.adminPage.loading)).toBeInTheDocument();
    })
})