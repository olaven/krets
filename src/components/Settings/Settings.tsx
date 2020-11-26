import { styled } from "../../stiches.config"
import * as text from "../../helpers/text";
import { Collapsible } from "../Collapsible";
import {
    UpdateName,
    UpdateTitle,
    DeletePage,
    ManageQuestions,
    ManageEmbeddable, 
    EnableEmailSummaries, 
    ToggleMandatoryContactDetails, 
} from "./Options"


const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyItems: "flex-start",
    margin: "auto",
    width: "100%" 
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
);