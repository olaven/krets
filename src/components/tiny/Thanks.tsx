import { Heading } from "rebass";
import { emojidata } from "../../emojidata";
import * as text from "../../text";

export const Thanks = () =>
    <Heading
        p={[2, 3, 4]}
        fontSize={[5, 6, 7]}
        backgroundColor="success"
        color="secondary">
        {text.response.thanks}
        {emojidata["tada"]}
    </Heading>