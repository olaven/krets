import React, { useState, useContext } from "react";
import { Box, Button, Flex, Link, Text, Image } from "rebass";
import { Input } from "@rebass/forms";
import { TooltipHelp } from "tooltip-help-react";
import * as text from "../../text"
import { CategoryModel } from "../../models";
import { UserContext } from "../../context/UserContext";
import { postCategory } from "../../http/fetchers";
import { CREATED } from "../../http/codes";


export const CategoryCreator = () => {

    const [name, setName] = useState("");
    const { user } = useContext(UserContext);
    const { HelpButton, Tooltip } = useContext(TooltipHelp)

    const onCreateCategory = async () => {

        const category: CategoryModel = {
            name,
            owner_id: user.sub
        };

        const [status] = await postCategory(category);
        if (status === CREATED) {

            console.log("JIPPI :D");
            //TODO: visuell + oppdatering 
        } else {

            console.error(`Received ${status} when posting category.`);
            alert("Ups, en feil oppsto") //TODO: localize / prettify 
        }
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

