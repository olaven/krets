import { useState } from "react";
import { styled } from "../../stiches.config";
import { useToggle } from "../../effects/useToggle";
import { TextInput } from "../standard/Input";
import { Modal } from "../standard/Modal";
import { Button } from "../standard/Button";
import { openKretsPDF } from "../../pdf/pdf";
import { ColumnContainer } from "../standard/Containers";

const UpperLeftCorner = styled("div", {
    opacity: .2,
    fontSize: "1.25em",
    positon: "absolute", 
    left: "$5",
    top: "$5", 
    ":hover": {
        opacity: 1,
        transition: "ease 100ms",
        cursor: "pointer", 
        transformOrigin: "center",
    },
});    

const FormContainer = styled(ColumnContainer, {
    height: "100%", 
    width: "100%",
    justifyContent: "space-around",
})

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
            
            <FormContainer>
                <ColumnContainer>
                    <label>enter header</label>
                    <TextInput value={header} onChange={(event) => {setHeader(event.target.value)}}></TextInput>
                </ColumnContainer>

                <ColumnContainer>
                    <label>enter subheader</label>
                    <TextInput value={subheader} onChange={(event) => {setSubheader(event.target.value)}}></TextInput>
                </ColumnContainer>

                <ColumnContainer>
                    <label>enter paragraph</label>
                    <TextInput value={paragraph} onChange={(event) => {setParagraph(event.target.value)}}></TextInput>
                </ColumnContainer>
                
                <Button onClick={onDownload}>Last ned plakat</Button>
            </FormContainer>
        
            
            

            

            

        </Modal>
    </>
}