import { Button, Box, Flex } from "rebass";
import { useState } from "react";
import * as text from "../../text";

export const CopyURLButton = () => {

    const [copied, setCopied] = useState(false);

    const copy = () => {

        const url = window.location.toString();
        navigator.clipboard.writeText(url);
        setCopied(true);
    }

    return <Flex py={[2, 3, 4]}>
        <Box width={[0, 2 / 5]} />
        <Button onClick={copy}
            opacity={copied ? 0.8 : 1}
            width={[1, 1 / 5]}
        >
            {copied ?
                text.response.copyButton.copied :
                text.response.copyButton.copy}
        </Button>
        <Box width={[0, 2 / 5]} />
    </Flex>

}