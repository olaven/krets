import * as uiText from "../../../text";
//import { Input, Label, Checkbox } from "@rebass/forms";
import { useState } from "react";
import { styled } from "../../../stiches.config";
import { Button } from "../../standard/Button";
import { H2 } from "../../standard/Heading";
import { TextInput } from "../../standard/Input";


const OuterContainer = styled("div", {
    display: "flex",
    flexDirection: "column"
})

const ButtonContainer = styled("div", {
    display: "flex",
    justifyItems: "center",
    justifyContent: "space-evenly"
});

const ContactTextInput = styled(TextInput, {
    variants: {
        error: {
            true: {
                color: "$attention"
            },
            false: {
                color: "$black"
            }
        }
    }
})


export const ContactInput = ({ isMandatory, setContactDetails, setShowSendButton, showContactDetailsError }) => {

    const [hasChosen, setHasChosen] = useState(false);
    const [wantsToGiveContactDetails, setWantsToGiveContactDeatils] = useState(false);

    const update = (to: boolean) =>
        () => {
            setHasChosen(true);
            setShowSendButton(true);
            setWantsToGiveContactDeatils(to);
        }



    const Choice = () => <OuterContainer>
        <ButtonContainer>
            <Button inverted onClick={update(true)}>
                {uiText.response.contact.yes}
            </Button>
            <Button inverted={!(hasChosen && !wantsToGiveContactDetails)} onClick={update(false)}>
                {uiText.response.contact.no}
            </Button>
        </ButtonContainer>
    </OuterContainer>;

    return <>
        <H2>{uiText.response.contact.heading}</H2>
        {isMandatory || wantsToGiveContactDetails ?
            <ContactTextInput
                placeholder={uiText.response.contact.placeholder}
                error={showContactDetailsError}
                onChange={(event) => {
                    setContactDetails(
                        event.target.value
                            .trim()
                            .toLowerCase()
                    )
                }}
            /> :
            <Choice />}
    </>


}

/* const MandatoryContactDetails = ({ setContactDetails, showContactDetailsError }) => <Input
    aria-label="response-contact-input"
    color={showContactDetailsError ? "attention" : undefined}
    placeholder={uiText.response.contactPlaceholder}
    onChange={event => {
        setContactDetails(event.target.value
            .trim()
            .toLowerCase())
    }}
/> */

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