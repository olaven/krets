import { NO_CONTENT } from "node-kall";
import { useContext } from "react"
import { Box, Text, Button } from "rebass";
import { SettingsContext } from "../../context/SettingsContext"
import { putPage } from "../../fetchers"
import * as text from "../../text";

const { enabledText, disabledText, updateWhenEnabled, updateWhenDisabled } = text.settings.mandatoryContact

export const ToggleMandatoryContactDetails = () => {

    const { page, updatePage } = useContext(SettingsContext);

    const onUpdate = async () => {

        const [status] = await putPage({
            ...page,
            mandatory_contact_details: !page.mandatory_contact_details
        });

        if (status === NO_CONTENT) {

            await updatePage();
        }
    }

    const text = page.mandatory_contact_details ? enabledText : disabledText;
    const update = page.mandatory_contact_details ? updateWhenEnabled : updateWhenDisabled;

    return <Box>
        <Button
            aria-label="toggle-mandatory-button"
            width={1}
            onClick={onUpdate}
        >
            {update}
        </Button>
        <Text
            fontSize={[21]}
        >
            {text}
        </Text>
    </Box>
}