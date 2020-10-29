/**
 * @jest-environment jsdom
 */

import * as faker from "faker";
import { waitFor, fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ResponseSection } from "../../../../src/components/Page/ReseponseSection/ResponseSection"
import { PageModel } from "../../../../src/models/models";
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
            ["😄", "😐", "😞"].forEach(emoji => {
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


            const arrowButton = getByLabelText("response-button-input");
            fireEvent.change(arrowButton)

            waitFor(() => {

                expect(getByLabelText("response-checkbox-input")).toBeInTheDocument()
                const checkBox = getByLabelText("response-checkbox-input");
                fireEvent.change(checkBox)

                waitFor(() => {

                    expect(findByLabelText("response-contact-input")).toBeInTheDocument();
                });
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


        //NOTE: skipping as header should always be visible -> header toggle was implemented, but removed 
        it.skip("Does not show header if `showHeader` is false", () => {

            const customPage = page()
            customPage.custom_title = faker.lorem.words(4);
            const { findByText } = launch(customPage);

            waitFor(() => {

                expect(findByText(customPage.custom_title)).not.toBeInTheDocument();
            });
        });

        it("Header is visible", () => {

            const customPage = page()
            customPage.custom_title = faker.lorem.words(4);
            const { findByText } = launch(customPage);

            waitFor(() => {

                expect(findByText(customPage.custom_title)).toBeInTheDocument();
            });
        });
    });
});