import { Button, Text } from "rebass"
import { Label, Textarea } from "@rebass/forms"
import { CREATED } from "node-kall"
import { postEmail } from "../../../fetchers"
import { useState } from "react"

const Thanks = () => <Text>TAKK!</Text>

const Error = () => <Text>Ups.. Forsoek senere eller post@krets.app</Text>

const Form = ({ text, setText, sendSuggestion }) => <> <Label htmlFor='comment'>Comment</Label>
    <Textarea
        value={text}
        onChange={event => { setText(event.target.value) }}
    />
    <Button onClick={sendSuggestion}>Send test mail</Button>
</>

export default () => {

    const [text, setText] = useState<string>("");
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);

    const sendSuggestion = async () => {

        const [status] = await postEmail({
            to: `post@krets.app`,
            from: `post@krets.app`,
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