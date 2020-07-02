import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { Input } from "@rebass/forms"
import { PagesContext } from "../../../context/PagesContext";
import { post } from "../../../http/methods";
import { OK, CREATED } from "../../../http/codes";
import * as text from "../../../text"

export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-")


export const PageCreator = () => {

    const { refreshPages } = useContext(PagesContext);
    const [name, setName] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {

        setId(nameToId(name))
    }, [name]);


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

    return <Flex py={[1, 2, 3]}>
        <Box width={1 / 3} />
        <Box
            as='form'
            onSubmit={e => e.preventDefault()}
            width={2 / 4}
        >
            <Text fontSize={3} width={1}>{text.pageCreator.preview} {`krets.app/${id}`}</Text>

            <Flex>
                <Input aria-label="pagename-input" placeholder={text.pageCreator.placeholder} onChange={({ target: { value } }) => {
                    setName(value)
                }} />
                <Button mx={[0, 2, 3]} width={1 / 3} onClick={postPage}>
                    {text.pageCreator.button}
                </Button>
            </Flex>

        </Box>
        <Box width={1 / 3} />
    </Flex>


};