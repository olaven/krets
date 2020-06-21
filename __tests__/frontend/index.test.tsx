/**
 * @jest-environment jsdom
 */

import React from "react";
import IndexPage from "../../src/pages/index"
import { waitFor, render } from "@testing-library/react"
import { AuthModel } from "../../src/models";
import * as faker from "faker";
import '@testing-library/jest-dom/extend-expect'
import { UserContext, UserContextProvider } from "../../src/context/UserContext";
import { PagesContextProvider } from "../../src/context/PagesContext";
import * as text from "../../src/text"
import { mockGet } from "./frontedTestUtils";
import { stringify } from "querystring";

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
    
            mockGet(mockUser);
    
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