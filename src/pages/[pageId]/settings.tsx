import { usePage } from "../../effects/usePage";
import { useRouter } from "next/router";
import { Box, Button, Heading, Text } from "rebass";
import { Input } from "@rebass/forms"
import { putPage } from "../../http/fetchers";
import { useState, useContext } from "react";
import { NO_CONTENT } from "../../http/codes";
import { SettingsContextProvider, SettingsContext } from "../../context/SettingsContext";
import PageId from "../[pageId]";

const UpdateName = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [name, setName] = useState(page.name);

    const updateName = async () => {

        page.name = name;
        const [status] = await putPage(page);
        if (status !== NO_CONTENT) {

            alert("en feil skjedde med oppdatering")
        } else {

            await updatePage();
            setName("");
        }
    }

    return <Box>
        <Input value={name} onChange={(event) => { setName(event.target.value) }}></Input>
        <Button onClick={updateName}>Oppdater navn</Button>
    </Box>
}

export const SettingsContent = () => {

    const { pageLoading, page } = useContext(SettingsContext);

    return pageLoading ?
        <Text>Loading..</Text> :
        <Box m={[1, 2, 3]} >
            <Heading fontSize={[3, 4, 5]}>
                Settings for {page.name}
            </Heading>
            <UpdateName />
        </Box>
}

const Settings = () => {

    const { query: { pageId } } = useRouter();

    return pageId ?
        <SettingsContextProvider pageId={pageId}>
            <SettingsContent />
        </SettingsContextProvider> :
        null
}
export default Settings; 