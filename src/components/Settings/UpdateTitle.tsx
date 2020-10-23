import { Flex } from "rebass";
import { Input } from "@rebass/forms"
import * as text from "../../text";
import { NO_CONTENT } from "node-kall";
import { useContext, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { putPage } from "../../fetchers";
import { TriggerLoadingButton } from "../standard/buttons";


export const UpdateTitle = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [title, setTitle] = useState(page.custom_title ? page.custom_title : `${text.response.header} ${page.name}`);

    const updateTitle = async () => {

        const [status] = await putPage({
            ...page,
            custom_title: title
        });

        if (status !== NO_CONTENT)
            console.warn(`${status} when updating page title`);
        //updatePage(); //NOTE: Not needed, as the update title only is shown in the input field where it's already entered
    }

    return <Flex>
        <Input
            id='name'
            name='name'
            value={title}
            onChange={(event) => { setTitle(event.target.value) }} />
        <TriggerLoadingButton
            text={text.settings.changeTitleButton}
            action={updateTitle} />
    </Flex>

}