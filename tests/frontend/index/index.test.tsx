/**
 * @jest-environment jsdom
 */

import React from "react";
import IndexPage from "../../../src/pages/index"
import { waitFor, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import * as text from "../../../src/text"

describe("The home page", () => {


    it("Shows intro section when no user is present", () => {

        const rendered = render(<IndexPage />)
        waitFor(() => {

            expect(rendered.findByText(text.intro.create)).toBeInTheDocument();
        })
    });

    /* 
        it("Shows pages when user _is_ present", async () => {
    
            const mockUser: AuthModel = {
                sub: faker.random.uuid(),
                name: faker.name.firstName()
            }
    
            mockFetch(mockUser);
    
            const { findByText } = render(<UserContextProvider>
                <PagesContextProvider user={mockUser}>
                    <IndexPage />
                </PagesContextProvider>
            </UserContextProvider>);
    
            waitFor(() => {
                expect(findByText(text.intro.create)).not.toBeInTheDocument();
            })
        }) */
});