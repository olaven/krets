import { useState, useEffect } from "react";
import { styled, css } from "../../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../../standard/Containers"
import { TextInput } from "../../../standard/Input";
import { Paragraph } from "../../../standard/Text";
import { Button } from "../../../standard/Button";

const Container = styled(ColumnContainer, {
    border: "solid black 1px",
    animationDuration: `800ms`,
    animmationDirection: "forwards",
    animationTimingFunction: "linear",
    animationName: `${css.keyframes({
        "0%": {
            opacity: 0,
            transform: `translateY(10%)`,
        },
        "100%": {
            opacity: 1,
            transform: "translateY(-100%)",
        }
    })}`
});

const InputContainer = styled(RowContainer, {});


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
                Jeg er fornøyd med navnet
            </Button>
        </InputContainer>
    </Container>
}
