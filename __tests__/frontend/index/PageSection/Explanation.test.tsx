/**
 * @jest-environment jsdom
 */

import React from "react";
import faker from "faker";
import { waitFor } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Explanation } from "../../../../src/components/Home/PageSection/Explanation"
import { launch } from "./utils";

describe("The Explanation Component", () => {

    it("Renders when there are no pages", () => {

        const { getByLabelText } = launch(<Explanation />);
        waitFor(() => {

            expect(getByLabelText("explanation-section")).toBeInTheDocument();
        });
    });

    it("Does not render when there are pages", () => {

        const { getByLabelText } = launch(<Explanation />, [
            { id: "my-page", name: "My Page", owner_id: faker.random.uuid() }
        ]);
        waitFor(() => {

            expect(getByLabelText("explanation-section")).not.toBeInTheDocument();
        });
    });
});