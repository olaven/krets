import * as uiText from "../../../text";
import { Input, Label, Checkbox } from "@rebass/forms";
import { Flex } from "rebass";
import { useState } from "react";
import { styled } from "../../../stiches.config";
import { Button } from "../../standard/Button";
import { Heading } from "../../standard/Heading";
import { TextInput } from "../../standard/Input";


const OuterContainer = styled("div", {
    display: "flex",
    flexDirection: "column"
})

const ButtonContainer = styled("div", {
    display: "flex",
});


export const ContactInput = ({ isMandatory, setContactDetails, setShowSendButton, showContactDetailsError }) => {

    const [hasChosen, setHasChosen] = useState(false);
    const [wantsToGiveContactDetails, setWantsToGiveContactDeatils] = useState(false);

    const update = (to: boolean) =>
        () => {
            setHasChosen(true);
            setShowSendButton(true);
            setWantsToGiveContactDeatils(to);
        }

    const Input = () => <TextInput
        placeholder={uiText.response.contact.placeholder}
        color={showContactDetailsError ? "$attention" : "$black"}
        onChange={(event) => {
            setContactDetails(event.target.value)
        }}
    />

    const Choice = () => <OuterContainer>
        <Heading>{uiText.response.contact.heading}</Heading>
        <ButtonContainer>
            <Button inverted onClick={update(true)}>
                {uiText.response.contact.yes}
            </Button>
            <Button inverted onClick={update(false)}>
                {uiText.response.contact.no}
            </Button>
        </ButtonContainer>
    </OuterContainer>;

    return isMandatory || wantsToGiveContactDetails ?
        <Input /> :
        hasChosen ?
            null :
            <Choice />
}

const MandatoryContactDetails = ({ setContactDetails, showContactDetailsError }) => <Input
    aria-label="response-contact-input"
    color={showContactDetailsError ? "attention" : undefined}
    placeholder={uiText.response.contactPlaceholder}
    onChange={event => {
        setContactDetails(event.target.value
            .trim()
            .toLowerCase())
    }}
/>

/* export const ContactInput = ({ setContactDetails, isMandatory, showContactDetailsError }) => {


    return <Flex p={[1, 2]}>
        {isMandatory ?
            <MandatoryContactDetails
                setContactDetails={setContactDetails}
                showContactDetailsError={showContactDetailsError}
            /> :
            <OptionalContactDetails
                setContactDetails={setContactDetails}
            />}
    </Flex>
} */