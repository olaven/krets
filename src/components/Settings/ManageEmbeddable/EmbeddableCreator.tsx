import { CREATED } from "node-kall";
import { useContext, useState } from "react";
import { Flex } from "rebass";
import { Input } from "@rebass/forms";
import { SettingsContext } from "../../../context/SettingsContext";
import { postEmbeddable } from "../../../fetchers";
import { TriggerLoadingButton } from "../../tiny/buttons";
import * as text from "../../../text";
import { EmbeddableContext } from "../../../context/EmbeddableContext";

const uiText = text.settings.embeddable

export const validURL = (url: string) => {

    try {

        new URL(url);
        return url;
    } catch {
        return false;
    }
}

/**
 * Adds protocol if it is not present on 
 * url
 * @param url 
 */
export const addProtocol = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") ?
        url :
        `https://${url}`;

export const EmbeddableCreator = () => {

    const { page } = useContext(SettingsContext);
    const { refreshEmbeddables } = useContext(EmbeddableContext)
    /* const [origin, setOrigin] = useState("");
    const [error, setError] = useState(false); */

    /*     const onCreate = async () => {
    
            const validated = validURL(
                addProtocol(
                    origin
                )
            );
    
            console.log("valiedated", validated);
            if (validated) {
    
                setError(false);
                const [status, embeddable] = await postEmbeddable({
                    origin: validated,
                    page_id: page.id
                });
    
                if (status === CREATED) {
                    console.log('Created', embeddable);
                }
            } else {
    
                setError(true);
            }
        } */

    const onGenerate = async () => {

        const [status] = await postEmbeddable({
            page_id: page.id
        });

        await refreshEmbeddables()
        if (status === CREATED)
            await refreshEmbeddables();
        else
            console.error(`${status} when fetching embeddable`)
    }

    return <Flex>
        {/*         <Input
            aria-label="embeddable-creator-input"
            placeholder={uiText.originPlaceholder}
            color={error && "orange"}
            onChange={({ target: { value } }) => {
                setOrigin(value)
            }}
            value={origin}
        /> */}
        <TriggerLoadingButton
            label="embeddable-generate-button"
            text={uiText.button}
            action={onGenerate}
        />
    </Flex>
}