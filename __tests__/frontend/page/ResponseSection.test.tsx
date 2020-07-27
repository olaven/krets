/**
 * @jest-environment jsdom
 */


import { waitFor, fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ResponseSection } from "../../../src/components/Page/ResponseSection"
import { PageModel } from "../../../src/models";
import { randomPage, randomUser } from "../../database/databaseTestUtils";

describe("The component for creating new responses", () => {

    const launch = (page: PageModel) =>
        render(<ResponseSection page={page} />);

    const page = () => randomPage(randomUser().id)

    describe("What's displayed at different times", () => {

        it("Does show something", () => {

            const { getByLabelText } = launch(page());
            expect(getByLabelText("response-section-header")).toBeInTheDocument();
        });

        it("Does show smileys at render", () => {

            const { getByText } = launch(page());
            expect(getByText("😃")).toBeInTheDocument();
            expect(getByText("😐")).toBeInTheDocument();
            expect(getByText("😦")).toBeInTheDocument();
        });


        it("Does render text input and button after smiley click", () => {

            const { getAllByLabelText, getByLabelText } = launch(page());
            const [button] = getAllByLabelText("response-emoji-button");
            fireEvent.click(button);

            waitFor(() => {

                expect(getByLabelText("response-text-input")).toBeInTheDocument();
                expect(getByLabelText("response-button-input")).toBeInTheDocument();
            })
        });

        it("Does contact checkbox is clicked", () => {

            const { findByLabelText, getByLabelText, getAllByLabelText } = launch(page());
            const [button] = getAllByLabelText("response-emoji-button");
            fireEvent.click(button);

            const checkBox = getByLabelText("response-checkbox-input")

            fireEvent.change(checkBox)

            waitFor(() => {

                expect(findByLabelText("response-contact-input")).toBeInTheDocument();
            });
        });
    });
});