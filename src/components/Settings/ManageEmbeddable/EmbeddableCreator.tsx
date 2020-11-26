import { CREATED } from "node-kall";
import { useContext} from "react";
import { Flex } from "rebass";
import { postEmbeddable } from "../../../helpers/fetchers";
import { TriggerLoadingButton } from "../../standard/buttons";
import * as text from "../../../helpers/text";
import { EmbeddableContext } from "../../../context/EmbeddableContext";
import { HomeContext } from "../../../context/HomeContext";

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

    const { selectedPage: page } = useContext(HomeContext);
    const { refreshEmbeddables } = useContext(EmbeddableContext)

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