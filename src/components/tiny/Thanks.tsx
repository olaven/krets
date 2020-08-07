import Emoji from "react-emoji-render";
import { Heading } from "rebass";
import * as text from "../../text";

export const Thanks = () =>
    <Heading
        p={[2, 3, 4]}
        fontSize={[5, 6, 7]}
        backgroundColor="success"
        color="secondary">
        {text.response.thanks}
        <Emoji text=":tada:" />
    </Heading>