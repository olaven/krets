/**
 * @jest-environment jsdom
 */

import * as faker from "faker";
import { waitFor, fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ResponseSection } from "../../../src/components/Page/ReseponseSection/ResponseSection"
import { PageModel } from "../../../src/models/models";
import { randomPage, randomUser } from "../../database/databaseTestUtils";

describe("The component for creating new responses", () => {

    const launch = (page: PageModel, showHeader = true) =>
        render(<ResponseSection page={page} showHeader={showHeader} embeddable={{ active: false }} />);

    const page = () => randomPage(randomUser().id)

    describe("What's displayed at different times", () => {

        it("Does show something", () => {

            const { getByLabelText } = launch(page());
            expect(getByLabelText("response-section-header")).toBeInTheDocument();
        });

        it("Does show smileys at render", () => {

            const { getByText } = launch(page());
            ["😃", "😐", "😦"].forEach(emoji => {
                expect(getByText(emoji)).toBeInTheDocument();
            });
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

        it("Does show contact input after contact checkbox is clicked", () => {

            const { findByLabelText, getByLabelText, getAllByLabelText } = launch(page());
            const [button] = getAllByLabelText("response-emoji-button");
            fireEvent.click(button);

            const checkBox = getByLabelText("response-checkbox-input");

            fireEvent.change(checkBox)

            waitFor(() => {

                expect(findByLabelText("response-contact-input")).toBeInTheDocument();
            });
        });

        it("Does not show contact text input checkbox if contact details are mandatory", () => {

            const { getByLabelText, getAllByLabelText } = launch({
                ...page(),
                mandatory_contact_details: true
            });
            const [button] = getAllByLabelText("response-emoji-button");
            fireEvent.click(button);

            waitFor(() => {

                expect(getByLabelText("response-checkbox-input")).not.toBeInTheDocument();
            });
        });


        it("Does show contact text input if contact details are mandatory", () => {

            const { getByLabelText, getAllByLabelText } = launch({
                ...page(),
                mandatory_contact_details: true
            });
            const [button] = getAllByLabelText("response-emoji-button");
            fireEvent.click(button);

            waitFor(() => {

                expect(getByLabelText("response-contact-input")).toBeInTheDocument();
            });
        });

        it("Does render custom header if present", () => {

            const customPage = page()
            customPage.custom_title = faker.lorem.words(4);
            const { findByText } = launch(customPage)

            waitFor(() => {

                expect(findByText(customPage.custom_title)).toBeInTheDocument();
            });
        });

        it("Does not show header if `showHeader` is false", () => {

            const customPage = page()
            customPage.custom_title = faker.lorem.words(4);
            const { findByText } = launch(customPage, false);

            waitFor(() => {

                expect(findByText(customPage.custom_title)).not.toBeInTheDocument();
            });
        });

        it("Does show header if `showHeader` is true", () => {

            const customPage = page()
            customPage.custom_title = faker.lorem.words(4);
            const { findByText } = launch(customPage, true);

            waitFor(() => {

                expect(findByText(customPage.custom_title)).toBeInTheDocument();
            });
        });
    });
});