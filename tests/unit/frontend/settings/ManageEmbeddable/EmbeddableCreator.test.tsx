/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { waitFor } from '@testing-library/react';
import { addProtocol, EmbeddableCreator, validURL } from "../../../../src/components/Settings/ManageEmbeddable/EmbeddableCreator";
import { randomEmbeddable } from "../../../database/databaseTestUtils";
import { mockFetch, renderWithPagesContext, renderWithEmbeddableContext } from "../../frontendTestUtils";


describe("URL validation", () => {

    it("Returns the URL on an obviously valid url", () => {

        expect(
            validURL(
                "https://example.com"
            )
        ).toBe("https://example.com");
    });

    it("Returns false on an obviously invalid url", () => {

        expect(
            validURL(
                "Example cannot be url -com"
            )
        ).toBe(false);
    });

    it("Does not accept URL without protocol", () => {

        expect(
            validURL(
                "example.com"
            )
        ).toBe(false);
    });
});

describe("URL protocol adder", () => {

    it("Does add if missing ", () => {

        expect(
            addProtocol(
                "example.com"
            )
        ).toBe("https://example.com");
    });

    it("Does _not_ modify if already present ", () => {

        expect(
            addProtocol(
                "https://example.com"
            )
        ).toBe("https://example.com");
    });
});