import { useContext } from "react";
import { CopyBlock, github } from "react-code-blocks";
import { Text } from "rebass";
import { EmbeddableContext } from "../../../context/EmbeddableContext";
import { SettingsContext } from "../../../context/SettingsContext";
import * as text from "../../../text";

export const EmbeddableSnippet = () => {

    const { embeddable } = useContext(EmbeddableContext);

    return <>
        <Text>{text.settings.embeddable.copyInstructions}</Text>
        <CopyBlock
            text={`<iframe src="https://krets.app/${embeddable.page_id}/embed?token=${embeddable.token}" 
                frameborder=0 
                width="500px" 
                height="550px" />`}
            theme={github}
            language="markup" />
    </>
}

