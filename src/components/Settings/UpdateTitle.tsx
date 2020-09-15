import { Box, Button, Heading, Flex } from "rebass";
import { Input, Label, Select } from "@rebass/forms"
import * as text from "../../text";
import { NO_CONTENT } from "node-kall";
import { useContext, useState } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { putPage } from "../../fetchers";


/**
 * FIXME: implemented in a hurry. Lots of duplication betwen this and other update functions 
 */
export const UpdateTitle = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [title, setTitle] = useState(page.custom_title ? page.custom_title : "");

    const updateName = async () => {

        const [status] = await putPage({

            ...page,
            custom_title: title
        });

        if (status !== NO_CONTENT) {

            alert(text.settings.changeNameError);
        } else {

            await updatePage();
            setTitle("");
        }
    }

    return <Box py={[1, 2, 3]}>
        <Flex>
            <Input id='name' name='name' value={title} onChange={(event) => { setTitle(event.target.value) }}></Input>
            <Button mx={1} onClick={updateName}>{text.settings.changeTitleButton}</Button>
        </Flex>
    </Box >
}