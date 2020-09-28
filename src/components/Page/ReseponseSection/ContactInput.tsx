import * as uiText from "../../../text";
import { Input, Label, Checkbox } from "@rebass/forms";
import { Flex } from "rebass";
import { useState } from "react";


export const ContactInput = ({ setContactDetails }) => {

    const [checked, setChecked] = useState(false)

    return <Flex p={[1, 2]}>
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
    </Flex>
}