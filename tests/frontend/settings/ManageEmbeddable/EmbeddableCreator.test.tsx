/**
 * @jest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { addProtocol, EmbeddableCreator, validURL } from "../../../../src/components/Settings/ManageEmbeddable/EmbeddableCreator";
import { randomEmbeddable } from "../../../database/databaseTestUtils";
import { mockFetch, renderWithPagesContext } from "../../frontendTestUtils";


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


describe("Creator Component", async () => {

    mockFetch(randomEmbeddable("test-page-id"), 201);

    it("is possible to click button if input is valid", () => {

        const { getByLabelText, getByText } = render(<EmbeddableCreator />);
        const origin = "https://some-site.com"
        const input = getByLabelText("embeddable-creator-input")
        fireEvent.change(input, { target: { value: origin } });

        waitFor(() => {

            expect(getByText(origin)).toBeInTheDocument()
        });

        const button = getByLabelText("embeddable-creator-button")
        fireEvent.click(button);
    });
});