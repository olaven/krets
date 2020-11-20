import { NO_CONTENT } from "node-kall";
import { useContext } from "react"
import { putPage } from "../../helpers/fetchers"
import * as text from "../../helpers/text";
import { Button } from "../standard/Button";
import { Paragraph } from "../standard/Text";
import { ColumnContainer } from "../standard/Containers";
import { HomeContext } from "../../context/HomeContext";

const { enabledText, disabledText, updateWhenEnabled, updateWhenDisabled } = text.settings.mandatoryContact


export const ToggleMandatoryContactDetails = () => {

    const { page, updatePage } = useContext(HomeContext);

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

    return <ColumnContainer>
        <Paragraph>
            {text}
        </Paragraph>
        <Button
            aria-label="toggle-mandatory-button"
            onClick={onUpdate}>
            {update}
        </Button>
    </ColumnContainer>
}