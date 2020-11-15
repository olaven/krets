import { useRouter } from "next/router";
import { useContext } from "react";
import { SettingsContextProvider, SettingsContext } from "../../context/SettingsContext";
import { UserContext } from "../../context/UserContext";
import * as text from "../../text"
import { Collapsible } from "../../components/Collapsible";
import { SubscriberWrapper } from "../../components/SubscriberWrapper";
import { Loader } from "../../components/standard/loader";
import { UpdateName, UpdateTitle, ManageQuestions, DeletePage, EnableEmailSummaries } from "../../components/Settings/Settings"
import { ManageEmbeddable } from "../../components/Settings/ManageEmbeddable/ManageEmbeddable";
import { ToggleMandatoryContactDetails } from "../../components/Settings/ToggleMandatoryContactDetails";
import { styled } from "../../stiches.config";
import { H1 } from "../../components/standard/Heading";


const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyItems: "center",
    margin: "auto",

    width: "79%",

    small: {
        width: "100%"
    }
});

const Heading = styled(H1, {
    textAlign: "left"
});

export const SettingsContent = () => {

    const { databaseUser } = useContext(UserContext)
    const { pageLoading, page } = useContext(SettingsContext);

    return (pageLoading || !databaseUser) ?
        <Loader size={150} /> :
        <Container>
            <Heading>
                {text.settings.heading} {page.name}
            </Heading>
            <Collapsible text={text.settings.changeNameHeader}>
                <UpdateName />
            </Collapsible>
            <Collapsible text={text.settings.changeTitleHeader}>
                <UpdateTitle />
            </Collapsible>
            <Collapsible text={text.settings.embeddable.heading}>
                <ManageEmbeddable />
            </Collapsible>
            <Collapsible text={text.settings.questions.heading}>
                <ManageQuestions />
            </Collapsible>
            <Collapsible text={text.settings.email.heading}>
                <EnableEmailSummaries />
            </Collapsible>
            <Collapsible text={text.settings.mandatoryContact.heading}>
                <ToggleMandatoryContactDetails />
            </Collapsible>
            <Collapsible text={text.settings.deletePageButton}>
                <DeletePage />
            </Collapsible>
        </Container>
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