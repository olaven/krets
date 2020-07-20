import React, { useState, useContext } from "react";
import { Box, Button, Flex, Link, Text, Image } from "rebass";
import { Input } from "@rebass/forms";
import { TooltipHelp } from "tooltip-help-react";
import * as text from "../../text"


export const CategoryCreator = () => {

    const [name, setName] = useState("");
    const { HelpButton, Tooltip } = useContext(TooltipHelp)

    const onCreateCategory = () => {


        // alert(text.pageCreator.error);
    }

    return <>
        <Box width={1 / 4} m="auto">
            <HelpButton />
        </Box>
        <Flex py={[1, 2, 3]}>
            <Box width={1 / 3} />
            <Box as='form' onSubmit={e => e.preventDefault()} width={2 / 4}>

                <Flex>
                    <Input aria-label="categoryname-input" placeholder={text.categoryCreator.placeholder} onChange={({ target: { value } }) => {
                        setName(value)
                    }} value={name} />
                    <Button mx={[0, 2, 3]} width={1 / 3} onClick={onCreateCategory} aria-label={"create-button"}>
                        {text.categoryCreator.button}
                    </Button>
                </Flex>

            </Box>
            <Box width={1 / 3} />
        </Flex>
    </>
}

