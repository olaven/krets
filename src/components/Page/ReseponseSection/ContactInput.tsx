import * as uiText from "../../../text";
import { Input, Label, Checkbox } from "@rebass/forms";
import { Flex } from "rebass";
import { useState } from "react";


const OptionalContactDetails = ({ setContactDetails }) => {

    const [checked, setChecked] = useState(false);

    return <>
        <Label width={[]} fontSize={[1]}>
            <Checkbox
                aria-label="response-checkbox-input"
                onChange={() => { setChecked(!checked) }}
                checked={checked}
            />
            {uiText.response.contactCheckbox}
        </Label>
        {checked &&
            <Input
                aria-label="response-contact-input"
                placeholder={uiText.response.contactPlaceholder}
                onChange={event => {
                    setContactDetails(event.target.value
                        .trim()
                        .toLowerCase())
                }}
            />
        }
    </>
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

export const ContactInput = ({ setContactDetails, isMandatory, showContactDetailsError }) => {


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
}