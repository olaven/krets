import { useState, useEffect } from "react";
import { styled, css } from "../../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../../standard/Containers"
import { TextInput } from "../../../standard/Input";
import { Paragraph } from "../../../standard/Text";
import { Button } from "../../../standard/Button";

const Container = styled(ColumnContainer, {
    position: "fixed",
    zIndex:1, 
    left: "50%",
    top: "50%", 
    transform: "translateX(-50%) translateY(-50%)",
    padding: "$34",
    border: "solid black 1px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "$secondary",
    animationDuration: `250ms`,
    animationFillMode: "forwards",
    animationTimingFunction: "ease",
    animationName: `${css.keyframes({
        "0%": {
            opacity: 0,
            transform: `scale(0.9) translateX(-50%) translateY(-50%)`,
        },
        "100%": {
            opacity: "1 !important",
            transform: `scale(1) translateX(-50%) translateY(-50%)`,
        }
    })}` 
});

const InputContainer = styled(RowContainer, {
    justifyContent: "center",

    "> *": {
        padding: "20px"
    }
});


export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-");


export const CreatorInput = () => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setId(
            nameToId(name)
        );
    }, [name]);

    return <Container>
        <Paragraph>Din url: https://krets.app/{id}</Paragraph>
        <InputContainer>
            <TextInput value={name} onChange={(event) => {
                setName(event.target.value);
            }} />
            <Button
                disabled={name.length <= 2}>
                OK
            </Button>
        </InputContainer>
    </Container>
}
