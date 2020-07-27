import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { Input } from "@rebass/forms"
import { PagesContext } from "../../../context/PagesContext";
import { post, CREATED, OK } from "node-kall";
import * as text from "../../../text"
import { TooltipHelp } from "tooltip-help-react";

export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-")


export const PageCreator = () => {

    console.log("post", post);

    const { refreshPages } = useContext(PagesContext);
    const { Tooltip, HelpButton } = useContext(TooltipHelp);

    const [name, setName] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {

        setId(nameToId(name))
    }, [name]);


    //TODO: this function should not be part of UI logic 
    const postPage = async () => {

        const page = {
            id, name
        };

        const [status] = await post(`/api/pages`, page);

        if (status === CREATED) {

            setName("");
            refreshPages();
        } else {

            alert(text.pageCreator.error);
            console.error("Error posting page: ", status);
        }
    };

    return <>
        <HelpButton />
        <Flex py={[1, 2, 3]}>

            <Box width={[0, 1 / 3]} />
            <Box as='form' onSubmit={e => e.preventDefault()} width={[1, 1 / 3]}>

                <Text fontSize={3} width={1}>{text.pageCreator.preview} {`krets.app/${id}`}</Text>

                <Flex>
                    <Tooltip content={text.tooltips.pageCreatorInput}>
                        <Input aria-label="pagename-input" placeholder={text.pageCreator.placeholder} onChange={({ target: { value } }) => {
                            setName(value)
                        }} value={name} />
                    </Tooltip>
                    <Tooltip content={text.tooltips.pageCreatorButton}>
                        <Button mx={[0, 2, 3]} width={1 / 3} onClick={postPage} aria-label={"create-button"}>
                            {text.pageCreator.button}
                        </Button>
                    </Tooltip>
                </Flex>

            </Box>
            <Box width={[0, 1 / 3]} />
        </Flex>
    </>

};