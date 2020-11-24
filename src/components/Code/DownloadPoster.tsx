import { useState } from "react";
import { styled } from "../../stiches.config";
import { useToggle } from "../../effects/useToggle";
import { TextInput } from "../standard/Input";
import { Modal } from "../standard/Modal";
import { Button } from "../standard/Button";
import { openKretsPDF } from "../../pdf/pdf";

const UpperLeftCorner = styled("div", {
    positon: "absolute", 
    left: "$5",
    top: "$5", 
    ":hover": {
        transition: "ease 100ms",
        cursor: "pointer", 
        transform: "scale(1.01)", 
        transformOrigin: "center",
    },
});    


export const DownloadPoster = ({page, getCanvasURL}) => {

    const [visible, toggle] = useToggle(false); 

    const [ header, setHeader] = useState("");
    const [ subheader, setSubheader] = useState("");
    const [ paragraph, setParagraph] = useState("");
    

    const onDownload = () => openKretsPDF({
        header,
        subheader,
        paragraph,
        QRDataURL: getCanvasURL(),
    }); 

    return <>
        <Button onClick={toggle}>Last ned plakat</Button>
        <Modal visible={visible}>
            <UpperLeftCorner onClick={toggle}>X</UpperLeftCorner>
            
            <label>enter header</label>
            <TextInput value={header} onChange={(event) => {setHeader(event.target.value)}}></TextInput>

            <label>enter subheader</label>
            <TextInput value={subheader} onChange={(event) => {setSubheader(event.target.value)}}></TextInput>

            <label>enter paragraph</label>
            <TextInput value={paragraph} onChange={(event) => {setParagraph(event.target.value)}}></TextInput>

            <Button onClick={onDownload}>Last ned plakat</Button>
        </Modal>
    </>
}