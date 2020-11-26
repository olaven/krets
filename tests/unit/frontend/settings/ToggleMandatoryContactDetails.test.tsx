/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
import { randomPage, randomUser } from "../../database/databaseTestUtils";
import { ToggleMandatoryContactDetails } from "../../../../src/components/Settings/ToggleMandatoryContactDetails";
import { mockFetch, renderWithHomeContext } from "../frontendTestUtils";
import * as text from "../../../../src/helpers/text";
import { fireEvent, waitFor } from '@testing-library/react';

describe("The component for updating wether page contact details should be mandatory or not", () => {

    const render = (mandatory: boolean, updatePage = async () => { }) =>
        renderWithHomeContext(
            <ToggleMandatoryContactDetails />,
            {
                ...randomPage(randomUser().id),
                mandatory_contact_details: mandatory,
            },
            updatePage);

    const renderEnabled = () => render(true);
    const renderDisabled = () => render(false);

    const { enabledText, disabledText, updateWhenEnabled, updateWhenDisabled } = text.settings.mandatoryContact

    it("Renders `enabledText` if mandatory is enabled", () => {

        const { getByText } = renderEnabled()
        expect(getByText(enabledText)).toBeInTheDocument();
    });

    it("Renders `disabledText` if mandatory is disabled", () => {

        const { getByText } = renderDisabled();
        expect(getByText(disabledText)).toBeInTheDocument();
    });
    it("Renders a button with `updateWhenEnabled` when enabled", () => {

        const { getByLabelText } = renderEnabled();
        const button = getByLabelText("toggle-mandatory-button");
        expect(button.textContent).toEqual(updateWhenEnabled);
    });

    it("Renders a button with `updateWhenDisabled` when disabled", () => {

        const { getByLabelText } = renderDisabled();
        const button = getByLabelText("toggle-mandatory-button");
        expect(button.textContent).toEqual(updateWhenDisabled);
    });

    it("Does attempt to update page on click", () => {

        mockFetch(204);
        const updateMock = jest.fn();
        const { getByLabelText } = render(true, updateMock);
        const button = getByLabelText("toggle-mandatory-button");

        fireEvent.click(button);

        waitFor(() => {

            expect(updateMock).toHaveBeenCalled();
        });
    });

    it("Does rerender with new page", () => {

        mockFetch(204);
        const updateMock = jest.fn(async () => { });
        const { getByLabelText, getByText } = render(true, updateMock);
        const button = getByLabelText("toggle-mandatory-button");

        fireEvent.click(button);

        waitFor(() => {

            expect(getByText(enabledText)).toBeInTheDocument();
        });

        mockFetch({
            ...randomPage(randomUser().id),
            mandatory_contact_details: false,
        }, 200);

        waitFor(() => {

            expect(updateMock).toHaveBeenCalled();
            expect(getByText(disabledText)).toBeInTheDocument();
        });
    })
});