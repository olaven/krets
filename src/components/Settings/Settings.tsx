import * as text from "../../text"
import { Collapsible } from "../../components/Collapsible";
import { UpdateName, UpdateTitle, ManageQuestions, DeletePage } from "../../components/Settings/Options"
import { ManageEmbeddable } from "../../components/Settings/ManageEmbeddable/ManageEmbeddable";
import { ToggleMandatoryContactDetails } from "../../components/Settings/ToggleMandatoryContactDetails";
import { styled } from "../../stiches.config";
import { H1 } from "../../components/standard/Heading";


const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyItems: "flex-start",
    margin: "auto",
    width: "100%"

    
});

const Heading = styled(H1, {
    textAlign: "left"
});


export const Settings = () => (
    <Container>
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
        <Collapsible text={text.settings.mandatoryContact.heading}>
            <ToggleMandatoryContactDetails />
        </Collapsible>
        <Collapsible text={text.settings.deletePageButton}>
            <DeletePage />
        </Collapsible>
    </Container>
);