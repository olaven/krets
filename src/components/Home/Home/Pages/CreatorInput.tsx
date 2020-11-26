import * as uiText from "../../../../helpers/text";
import { postPage } from "../../../../helpers/fetchers";
import { useState, useEffect, useContext } from "react";
import { styled, css } from "../../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../../standard/Containers"
import { TextInput } from "../../../standard/Input";
import { Paragraph } from "../../../standard/Text";
import { Button } from "../../../standard/Button";
import { Modal, UpperLeftCorner } from "../../../standard/Modal";
import { CONFLICT, CREATED } from "node-kall";
import { PageModel } from "../../../../models/models";
import { PagesContext } from "../../../../context/PagesContext";


export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-");

const Container = styled(ColumnContainer, {
    alignItems: "center",
    marginTop: "$55",

    small: {
        marginTop: "$1"
    }
})

export const CreatorInput = ({visible, toggleVisibility}: {visible: boolean, toggleVisibility: () => void}) => {

    const { addPage } = useContext(PagesContext); 

    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setId(
            nameToId(name)
        );
    }, [name]);

    const onClick = async () => {
 
        const [ status, page ] = await postPage({
            id, name
        } as PageModel); //NOTE: missing .owner_id, but that's added in the backend

        if (status === CREATED) {

            addPage(page);
            toggleVisibility();
        } else if (status === CONFLICT) {

            alert(uiText.pageCreator.conflict);
        }
        else {

            alert(uiText.pageCreator.error);
            console.error("Error posting page: ", status);
        }
    }

    return (
        <Modal visible={visible}>
            <UpperLeftCorner onClick={toggleVisibility}>
                X
            </UpperLeftCorner>

            <Container>
                <Paragraph>{uiText.pageCreator.preview} https://krets.app/{id}</Paragraph>    

                <RowContainer>
                    <TextInput 
                        value={name}
                        placeholder={uiText.pageCreator.placeholder}
                        onChange={(event) => {
                            setName(event.target.value);
                        }} 
                        />
                    <Button
                        onClick={onClick}
                        disabled={name.length <= 2}>
                        {uiText.pageCreator.button}
                    </Button>
                </RowContainer>
            </Container>
        </Modal>
    )
}
