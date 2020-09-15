import * as text from "../../text"
import { NO_CONTENT } from "node-kall"
import { useContext, useState } from "react"
import { Box, Flex, Button } from "rebass"
import { Input } from "@rebass/forms"
import { SettingsContext } from "../../context/SettingsContext"
import { putPage } from "../../fetchers"


export const UpdateName = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [name, setName] = useState(page.name);

    const updateName = async () => {

        page.name = name;
        const [status] = await putPage(page)
        if (status !== NO_CONTENT) {

            alert(text.settings.changeNameError)
        } else {

            await updatePage();
            setName("");
        }
    }

    return <Box py={[1, 2, 3]}>
        <Flex>
            <Input id='name' name='name' value={name} onChange={(event) => { setName(event.target.value) }}></Input>
            <Button mx={1} onClick={updateName}>{text.settings.changeNameButton}</Button>
        </Flex>
    </Box >
}