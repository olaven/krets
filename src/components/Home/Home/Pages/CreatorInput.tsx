import { useState, useEffect } from "react";
import { styled, css } from "../../../../stiches.config"
import { RowContainer, ColumnContainer } from "../../../standard/Containers"
import { TextInput } from "../../../standard/Input";
import { Paragraph } from "../../../standard/Text";
import { Button } from "../../../standard/Button";

const Container = styled(ColumnContainer, {
    border: "solid black 1px",
    borderRadius: "15px",
    backgroundColor: "$secondary",
    animationDuration: `250ms`,
    animationFillMode: "forwards",
    animationTimingFunction: "ease",
    animationName: `${css.keyframes({
        "0%": {
            opacity: 0,
            transform: `translateY(10%) translateX(100%) scale(1)`,
        },
        "100%": {
            opacity: "1 !important",
            transform: "translateY(-100%) translateX(-10%) scale(1.25)",
        }
    })}`
});

const InputContainer = styled(RowContainer, {
    backgroundColor: "red",
    justifyContent: "center",

    "> *": {
        backgroundColor: "blue",
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
