import { useRouter } from "next/router";
import { Box, Heading, } from "rebass";
import { useContext } from "react";
import { SettingsContextProvider, SettingsContext } from "../../context/SettingsContext";
import * as text from "../../text"
import { Collapsible } from "../../components/Collapsible";
import { SubscriberWrapper } from "../../components/SubscriberWrapper";
import { Loader } from "../../components/tiny/loader";
import { UpdateName, UpdateTitle, ManageQuestions, DeletePage } from "../../components/Settings/Settings"




//TODO: use other places, if useful here
const WidthContainer = ({ children }) => <Flex>
    <Box width={[0, 1 / 4, 1 / 3]}></Box>
    <Box width={[1, 2 / 4, 1 / 3]}>
        {children}
    </Box>
    <Box width={[0, 1 / 4, 1 / 3]}></Box>
</Flex >

export const SettingsContent = () => {

    const { pageLoading, page } = useContext(SettingsContext);

    return pageLoading ?
        <Loader size={150} /> :
        <WidthContainer>
            <Heading fontSize={[3, 4, 5]}>
                {text.settings.heading} {page.name}
            </Heading>
            <Collapsible text={text.settings.changeNameHeader}>
                <UpdateName />
            </Collapsible>
            <Collapsible text={text.settings.changeTitleHeader}>
                <UpdateTitle />
            </Collapsible>
            <Collapsible text={text.settings.questions.heading}>
                <ManageQuestions />
            </Collapsible>
            <Collapsible text={text.settings.deletePageButton}>
                <DeletePage />
            </Collapsible>
        </WidthContainer>
}

const Settings = SubscriberWrapper(() => {

    const { query: { pageId } } = useRouter();

    return pageId ?
        <SettingsContextProvider pageId={pageId}>
            <SettingsContent />
        </SettingsContextProvider> :
        null
});

export default Settings; 