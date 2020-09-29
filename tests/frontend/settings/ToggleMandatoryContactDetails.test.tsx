/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
import { randomPage, randomUser } from "../../database/databaseTestUtils";
import { ToggleMandatoryContactDetails } from "../../../src/components/Settings/ToggleMandatoryContactDetails";
import { renderWithSettingsContext } from "../frontendTestUtils";
import * as text from "../../../src/text";

describe("The component for updating wether page contact details should be mandatory or not", () => {

    const render = (mandatory: boolean) =>
        renderWithSettingsContext(<ToggleMandatoryContactDetails />, {
            ...randomPage(randomUser().id),
            mandatory_contact_details: mandatory
        });

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
});