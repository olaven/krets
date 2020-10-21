import { useState, ReactChild } from "react"
import { Box } from "rebass";
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
    paddingTop: "$21"
});



type Props = { text: string, children: ReactChild }
export const Collapsible = ({ text, children }: Props) => {

    const [visible, toggle] = useToggle(false);

    return <>
        <CollapsibleButton
            onClick={toggle}>
            {text}
        </CollapsibleButton>
        <Box style={{
            display: visible ? "inherit" : "none"
        }}>
            {children}
        </Box>
    </>
}