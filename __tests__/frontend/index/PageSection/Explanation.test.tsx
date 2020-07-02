/**
 * @jest-environment jsdom
 */

import React from "react";
import faker from "faker";
import { waitFor, fireEvent, getByLabelText } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Explanation } from "../../../../src/components/Home/PageSection/Explanation"
import { renderWithPagesContext } from "../../frontendTestUtils";

describe("The Explanation Component", () => {

    //TODO: Replace this after localizing 
    const helpContentText = "Hjelpen staar her!"
    const helpButtonText = "Vis meg hvordan Krets funker!";
    const understoodButtonText = "Skjønner!";;

    waitFor(() => {

        expect(getByText(helpContentText)).not.toBeInTheDocument();
        expect(getByText(helpButtonText)).toBeInTheDocument();
    });

    it("Renders when there are no pages", () => {

        const { getByLabelText } = renderWithPagesContext(<Explanation />);
        waitFor(() => {

            expect(getByLabelText("explanation-section")).toBeInTheDocument();
        });
    });

    it("Does not render when there are pages", () => {

        const { getByLabelText } = renderWithPagesContext(<Explanation />, [
            { id: "my-page", name: "My Page", owner_id: faker.random.uuid() }
        ]);
        waitFor(() => {

            expect(getByLabelText("explanation-section")).not.toBeInTheDocument();
        });
    });

    it("Shows help after clicking button", () => {

        const { getByText } = renderWithPagesContext(< Explanation />);
        waitFor(() => {
            expect(getByText(helpContentText)).not.toBeInTheDocument();
        });

        fireEvent.click(getByText(helpButtonText));

        waitFor(() => {

            expect(getByText(helpContentText)).toBeInTheDocument();
        });
    });

    it("Closes when the user clicks appropriate button", () => {

        const { getByText } = renderWithPagesContext(<Explanation />);

        fireEvent.click(getByText(helpButtonText))
        waitFor(() => {
            expect(getByText(helpContentText)).toBeInTheDocument();
        });

        fireEvent.click(getByText(understoodButtonText));

        waitFor(() => {

            expect(getByText(helpContentText)).not.toBeInTheDocument();
            expect(getByText(helpButtonText)).toBeInTheDocument();
        });
    })
});