
import { useState } from "react";
import * as text from "../../text";
import { styled } from "../../stiches.config";
import { Button } from "../standard/Button";

const Container = styled("div", {
    position: "fixed",
    margin: "0 auto",
    top: "80vh",
    left: "50vw",
    transform: "translateX(-40%)",
});



export const CopyURLButton = () => {

    const [copied, setCopied] = useState(false);

    const copy = () => {

        const url = window.location.toString();
        navigator.clipboard.writeText(url);
        setCopied(true);
    }

    return <Container>
        <Button onClick={copy}>
            {copied ?
                text.response.copyButton.copied :
                text.response.copyButton.copy}
        </Button>
    </Container>


}