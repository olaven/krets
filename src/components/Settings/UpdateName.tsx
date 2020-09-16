import * as text from "../../text"
import { NO_CONTENT } from "node-kall"
import { useContext, useState } from "react"
import { Box, Flex } from "rebass"
import { Input } from "@rebass/forms"
import { SettingsContext } from "../../context/SettingsContext"
import { putPage } from "../../fetchers"
import { TriggerLoadingButton } from "../tiny/buttons"


export const UpdateName = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [name, setName] = useState(page.name);

    const updateName = async () => {

        const [status] = await putPage({ ...page, name });
        if (status !== NO_CONTENT)
            console.warn(`${status} when updating page name`);
        await updatePage();
    }

    return <Box py={[1, 2, 3]}>
        <Flex>
            <Input
                id='name'
                name='name'
                value={name}
                onChange={(event) => { setName(event.target.value) }} />
            <TriggerLoadingButton
                text={text.settings.changeNameButton}
                action={updateName} />
        </Flex>
    </Box >
}