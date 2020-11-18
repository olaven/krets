import { useState } from "react"
import { Button, Text } from "rebass"
import { Label, Textarea } from "@rebass/forms"
import { CREATED } from "node-kall"
import { postEmail } from "../../../helpers/fetchers"
import * as uiText from "../../../helpers/text";

import { emojidata } from "../../../helpers/emojidata"


const Error = () => <Text>
    {uiText.charts.suggestion.error}
</Text>

const Form = ({ text, setText, sendSuggestion }) => <> <Label>
    {uiText.charts.suggestion.label}
</Label>
    <Textarea
        value={text}
        onChange={event => { setText(event.target.value) }}
    />
    <Button onClick={text ? sendSuggestion : null} opacity={text ? 1 : 0.8}>
        {uiText.charts.suggestion.send}
    </Button>
</>

export const ChartSuggestion = () => {

    const [text, setText] = useState<string>("");
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);

    const sendSuggestion = async () => {

        const [status] = await postEmail({
            text
        });

        if (status === CREATED) {

            setPosted(true);
        } else {

            setError(true);
        }
    }

    return posted ?
        <div>Forslaget er sendt. Tusen takk {emojidata[":-)"]}</div> :
        error ?
            <Error /> :
            <Form
                text={text}
                setText={setText}
                sendSuggestion={sendSuggestion}
            />

}