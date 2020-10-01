/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { findByLabelText, waitFor } from '@testing-library/react';
import { EmbeddableContent } from "../../../../src/components/Settings/ManageEmbeddable/ManageEmbeddable";
import { randomEmbeddable } from "../../../database/databaseTestUtils";
import { mockFetch, renderWithPagesContext, renderWithEmbeddableContext } from "../../frontendTestUtils";


describe("Manage Embeddable Content", async () => {

    it("if no embeddable is present, button to generate is visible", () => {

        mockFetch(randomEmbeddable("test-page-id"), 201);
        const { getByLabelText } = renderWithEmbeddableContext(<EmbeddableContent />, null);
        const button = getByLabelText("embeddable-generate-button");
        expect(button).toBeInTheDocument();
    });

    it(" if embeddable is present, button to generate is not visible", () => {

        const { findByLabelText } = renderWithEmbeddableContext(<EmbeddableContent />);
        const button = findByLabelText("embeddable-generate-button");
        waitFor(() => {

            expect(button).not.toBeInTheDocument();
        })
    });


    it(" if embeddable is present, code is visible", () => {

        const { findByLabelText } = renderWithEmbeddableContext(<EmbeddableContent />);
        const code = findByLabelText("<iframe");

        waitFor(() => {

            expect(code).toBeInTheDocument();
        })
    });
});