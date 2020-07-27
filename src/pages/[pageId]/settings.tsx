import { useRouter } from "next/router";
import { Box, Button, Heading, Text, Flex } from "rebass";
import { Input } from "@rebass/forms"
import { putPage, deletePage } from "../../fetchers";
import { useState, useContext } from "react";
import { NO_CONTENT } from "node-kall";
import { SettingsContextProvider, SettingsContext } from "../../context/SettingsContext";
import * as text from "../../text"
import config from "../../auth/config";

const UpdateName = () => {

    const { page, updatePage } = useContext(SettingsContext);
    const [name, setName] = useState(page.name);

    const updateName = async () => {

        page.name = name;
        const [status] = await putPage(page);
        if (status !== NO_CONTENT) {

            alert(text.settings.changeNameError);
        } else {

            await updatePage();
            setName("");
        }
    }

    return <Flex>
        <Input value={name} onChange={(event) => { setName(event.target.value) }}></Input>
        <Button onClick={updateName}>{text.settings.changeNameButton}</Button>
    </Flex>
}

export const DeletePage = () => {

    const router = useRouter();
    const { page } = useContext(SettingsContext);
    const [wantsToDelete, setWantsToDelete] = useState(false);

    const performDeletion = async () => {

        const [status] = await deletePage(page.id);
        if (status === NO_CONTENT) {

            router.replace("/");
        } else {

            alert(text.settings.deleteError)
        }
    }

    const WantsToDeleteToggle = () => <Button
        onClick={() => { setWantsToDelete(!wantsToDelete) }}
        backgroundColor={wantsToDelete ? "grey" : "failure"}>
        {text.settings.deleteButton}
    </Button>

    const Confirmation = () => <Box>
        <Text my={[1, 2, 3]} fontSize={[1, 2, 3]}>{text.settings.deleteWarning}</Text>
        <Flex>
            <Button onClick={() => setWantsToDelete(!wantsToDelete)}>{text.settings.deleteCancelation}</Button>
            <Button onClick={performDeletion} backgroundColor="failure">{text.settings.deleteConfirmation}</Button>
        </Flex>
    </Box>

    return <Box my={[1, 2, 3]}>
        <WantsToDeleteToggle />
        {wantsToDelete && <Confirmation />}
    </Box>
}

export const SettingsContent = () => {

    const { pageLoading, page } = useContext(SettingsContext);

    return pageLoading ?
        <Text>{text.settings.loading}</Text> :
        <Box m={[1, 2, 3]} >
            <Heading fontSize={[3, 4, 5]}>
                {text.settings.heading} {page.name}
            </Heading>
            <UpdateName />
            <DeletePage />
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