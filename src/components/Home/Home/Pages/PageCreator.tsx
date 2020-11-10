import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { Input } from "@rebass/forms"
import { PagesContext } from "../../../../context/PagesContext";
import { post, CREATED, CONFLICT } from "node-kall";
import * as text from "../../../../text"
import { PageModel } from "../../../../models/models";

export const nameToId = (name: string) => name
    .toLowerCase()
    .replace(/(Ø|ø)/g, "oe")
    .replace(/(Æ|æ)/g, "ae")
    .replace(/(Å|å)/g, "aa")
    .replace("?", "")
    .replace("!", "")
    .replace(/[^a-zA-Z0-9s|]/g, "-")


export const PageCreator = () => {

    const { addPage } = useContext(PagesContext);

    const [name, setName] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {

        setId(nameToId(name))
    }, [name]);


    //TODO: this function should not be part of UI logic 
    const postPage = async () => {

        const [status, page] = await post(`/api/pages`, {
            id, name
        });

        if (status === CREATED) {

            setName("");
            addPage(page as PageModel); //NOTE: missing .owner_id, but that is added in backend
        } else if (status === CONFLICT) {

            alert(text.pageCreator.conflict);
        }
        else {

            alert(text.pageCreator.error);
            console.error("Error posting page: ", status);
        }
    };

    return <>
        <Flex py={[1, 2, 3]}>

            <Box width={[0, 1 / 3]} />
            <Box as='form' onSubmit={e => e.preventDefault()} width={[1, 1 / 3]}>



                <Text fontSize={3} width={1}>{text.pageCreator.preview} {`krets.app/${id}`}</Text>
                <Flex>
                    <Input aria-label="pagename-input" placeholder={text.pageCreator.placeholder} onChange={({ target: { value } }) => {
                        setName(value)
                    }} value={name} />

                    <Button
                        mx={[0, 2, 3]}
                        width={1 / 3}
                        aria-label={"create-button"}
                        onClick={id === "" ? null : postPage}
                        color={id === "" ? "inactive" : "secondary"}>
                        {text.pageCreator.button}
                    </Button>
                </Flex>

            </Box>
            <Box width={[0, 1 / 3]} />
        </Flex>
    </>

};