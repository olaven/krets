/**
 * @jest-environment jsdom
 */

import React from "react";
import { waitFor, render, fireEvent, findByText } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { PagesContext } from "../../../src/context/PagesContext";
import * as text from "../../../src/text"
import { PageCreator, nameToId } from "../../../src/components/Home/PageSection/PageCreator";

describe("The nameToId function", () => {

    it("Turns spaces into dashes", () => {

        const name = "my value";
        const id = nameToId(name);

        expect(id).toEqual("my-value");
    });

    it("Turns special letters into expected pair", () => {

        const pairs = [
            ['Ø', 'oe'],
            ['Æ', 'ae'],
            ['Å', 'aa'],
            ['ø', 'oe'],
            ['æ', 'ae'],
            ['å', 'aa'],
            ['?', ''],
            ['!', '']
        ];

        for (const [original, expected] of pairs) {

            const id = nameToId(original);
            expect(id).toEqual(expected);
        }
    });

    it("Converts multiple occurences of illegal characters", () => {

        const value = "one two three four five";
        const id = nameToId(value);
        expect(id).toEqual("one-two-three-four-five");
    });

    it("fallbacks to dashes on special chars not accounted for", () => {

        const value = "*";
        const id = nameToId(value);
        expect(id).toEqual("-");
    });

    it("Convers everything to lowecase", () => {

        const value = "HeLlO";
        const id = nameToId(value);
        expect(id).toEqual("hello");
    });
})

describe("The page creator component", () => {

    const refreshPagesMock = jest.fn(async () => {

        // intentionally blank. 
    });
    const launch = () => render(
        <PagesContext.Provider value={{
            refreshPages: refreshPagesMock
        }}>
            <PageCreator />
        </PagesContext.Provider>
    );

    it("Does render", () => {

        const { findByText } = launch();


        waitFor(() => {

            expect(findByText(text.pageCreator.preview)).toBeInTheDocument();
        });
    });

    it("Updates preview on input", () => {

        const value = "some new value"
        const { getByLabelText, getByText } = launch();

        waitFor(() => {

            expect(getByText(value)).not.toBeInTheDocument();
        });

        const input = getByLabelText("pagename-input")
        fireEvent.change(input, { target: { value } })

        waitFor(() => {

            expect(getByText(nameToId(value))).toBeInTheDocument();
        });
    });
});