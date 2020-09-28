import { useContext } from "react";
import { Flex, Text } from "rebass";
import { Input } from "@rebass/forms";
import { SettingsContext } from "../../../context/SettingsContext";
import * as text from "../../../text";
import { TriggerLoadingButton } from "../../tiny/buttons";

const uiText = text.settings.embeddable

const EmbeddableCreator = () => {

    const { page } = useContext(SettingsContext);

    const onCreate = async () => {

        console.log(page);
    }

    return <Flex>
        <Input
            placeholder={uiText.originPlaceholder}
        />
        <TriggerLoadingButton
            text={uiText.button}
            action={onCreate}
        />
    </Flex>
}

export const ManageEmbeddable = () => <>
    <Text>{uiText.info}</Text>
    <EmbeddableCreator />
</>