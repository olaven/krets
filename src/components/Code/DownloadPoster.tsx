import { useState } from "react";
import { styled } from "../../stiches.config";
import { useToggle } from "../../effects/useToggle";
import { TextArea, TextInput } from "../standard/Input";
import { Modal } from "../standard/Modal";
import { Button } from "../standard/Button";
import { openKretsPDF } from "../../pdf/pdf";
import { ColumnContainer } from "../standard/Containers";

import * as text from "../../helpers/text";
const uiText = text.page.pdf; 

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
}); 

const AttributionSpan = styled("span", {
    fontSize: ".8em", 
    opacity: 0.8, 
});


export const DownloadPoster = ({page, getCanvasURL}) => {

    const [visible, toggleVisibility] = useToggle(false); 

    const [ header, setHeader] = useState(uiText.defaults.header);
    const [ subheader, setSubheader] = useState(uiText.defaults.subheader);
    const [ paragraph, setParagraph] = useState(uiText.defaults.paragraph);
    

    const onDownload = () => {
        
        console.log(
            {
                filename: page.id + "-plakat.pdf",
                header,
                subheader,
                paragraph,
                QRDataURL: getCanvasURL(),
            }
        )
        openKretsPDF({
            filename: page.id + "-plakat.pdf",
            header,
            subheader,
            paragraph,
            QRDataURL: getCanvasURL(),
        });

        toggleVisibility();
    }    

    return <>
        <Button onClick={toggleVisibility}>{uiText.download}</Button>
        <Modal visible={visible}>
            <UpperLeftCorner onClick={toggleVisibility}>X</UpperLeftCorner>
            
            <FormContainer>
                <ColumnContainer>
                    <label>{uiText.labels.header}</label>
                    <TextInput 
                    value={header} 
                    onChange={(event) => {setHeader(event.target.value)}} />
                </ColumnContainer>

                <ColumnContainer>
                    <label>{uiText.labels.subheader}</label>
                    <TextInput 
                    value={subheader} 
                    onChange={(event) => {setSubheader(event.target.value)}} />
                </ColumnContainer>

                <ColumnContainer>
                    <label>{uiText.labels.paragraph}</label>
                    <TextArea 
                        value={paragraph} 
                        onChange={(event) => {setParagraph(event.target.value)}} 
                    />
                </ColumnContainer>
                
                <Button onClick={onDownload}>Last ned plakat</Button>
                <AttributionSpan>
                    PDF-emojis er designet av "<a href="https://openmoji.org/">OpenMoji</a> – the open-source emoji and icon project". Lisens: CC BY-SA 4.0
                </AttributionSpan>
            </FormContainer>
        
            
            

            

            

        </Modal>
    </>
}