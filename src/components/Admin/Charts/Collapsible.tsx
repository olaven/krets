import { useState, ReactChild } from "react"
import { Box, Button } from "rebass";

type Props = { text: string, children: ReactChild }
export const Collapsible = ({ text, children }: Props) => {

    const [visible, setVisible] = useState(false);

    return <>
        <Button
            aria-label={"collapsible-button"}
            onClick={() => {
                setVisible(!visible);
            }}
            backgroundColor="secondary"
            color="primary"
            width={1}
            fontSize={[1, 2, 3]}
            opacity={visible ? 0.5 : 1}
            style={{
                alignContent: "left",
                textAlign: "left"
            }}
            px={0}
        >
            {text}
        </Button>
        <Box style={{
            display: visible ? "inherit" : "none"
        }}>
            {children}
        </Box>
    </>
}