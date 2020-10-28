import { useState, ReactChild } from "react";
import { useToggle } from "../effects/useToggle";
import { styled } from "../stiches.config";


const CollapsibleButton = styled("button", {
    border: "none",
    color: "$primary",
    backgroundColor: "$secondary",
    cursor: "pointer",
    fontSize: "$34",
    textAlign: "left",
    paddingTop: "$21",

    variants: {
        visible: {
            true: {
                opacity: "0.7",
            }
        }
    }
});

const ContentContainer = styled("div", {

    display: "none",

    variants: {
        visible: {
            true: {
                display: "inherit",
            }
        }
    }
})



type Props = { text: string, children: ReactChild }
export const Collapsible = ({ text, children }: Props) => {

    const [visible, toggle] = useToggle(false);

    return <>
        <CollapsibleButton
            visible={visible}
            onClick={toggle}>
            {text}
        </CollapsibleButton>
        <ContentContainer
            visible={visible}>
            {children}
        </ContentContainer>
    </>
}