import { Button } from "rebass";
import { useState } from "react";

export const CopyURLButton = () => {

    const [copied, setCopied] = useState(false);

    const copy = () => {

        const url = window.location.toString();
        navigator.clipboard.writeText(url);
        setCopied(true);
    }

    return <Button onClick={copy}>
        {copied ?
            "Kopiert!" :
            "Kopier"}
    </Button>
}