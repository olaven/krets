import { Button } from "rebass";
import { useState, useEffect } from "react";

export const Download = ({ querySelector, fileName }) => {

    const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);
    const [href, setHref] = useState("")

    useEffect(() => {
        const canvas = document.querySelector(querySelector) as HTMLCanvasElement;
        setCanvas(canvas);
    }, []);


    return <Button href={canvas?.toDataURL()} download={fileName}>
        <a href={canvas?.toDataURL()} download={fileName}>
            Last ned!
        </a>
    </Button>
}