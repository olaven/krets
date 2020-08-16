import { Button } from "rebass";
import { useState, useEffect } from "react";
import * as text from "../../text";

export const Download = ({ querySelector, fileName }) => {

    const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = document.querySelector(querySelector) as HTMLCanvasElement;
        setCanvas(canvas);
    }, []);


    return <Button href={canvas?.toDataURL()} download={fileName}>
        <a
            href={canvas?.toDataURL()}
            download={fileName}
            style={{ color: "inherit" }}>
            {text.page.download}
        </a>
    </Button>
}