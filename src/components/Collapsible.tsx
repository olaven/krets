import { useState, ReactChild } from "react"
import { styled } from "../stiches.config";


//TODO: split out if fun enough :) 
const useToggle = (initial: boolean): [boolean, () => any] => {

    const [value, setValue] = useState(initial);
    const toggle = () => {

        setValue(!value);
    }

    return [
        value,
        toggle
    ]
}


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