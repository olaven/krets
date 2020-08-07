import { useState } from "react"
import { Button, Text } from "rebass"
import { Label, Textarea } from "@rebass/forms"
import { CREATED } from "node-kall"
import { postEmail } from "../../../fetchers"
import * as uiText from "../../../text";

import { Thanks } from "../../tiny/Thanks"


const Error = () => <Text>
    {uiText.charts.suggestion.error} {process.env.CONTACT_EMAIL}
</Text>

const Form = ({ text, setText, sendSuggestion }) => <> <Label>
    {uiText.charts.suggestion.label}
</Label>
    <Textarea
        value={text}
        onChange={event => { setText(event.target.value) }}
    />
    <Button onClick={sendSuggestion}>
        {uiText.charts.suggestion.send}
    </Button>
</>

export default () => {

    const [text, setText] = useState<string>("");
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);

    const sendSuggestion = async () => {

        const [status] = await postEmail({
            to: process.env.CONTACT_EMAIL,
            from: process.env.CONTACT_EMAIL,
            text
        });

        if (status === CREATED) {

            setPosted(true);
        } else {

            setError(true);
        }
    }

    return posted ?
        <Thanks /> :
        error ?
            <Error /> :
            <Form
                text={text}
                setText={setText}
                sendSuggestion={sendSuggestion}
            />

}