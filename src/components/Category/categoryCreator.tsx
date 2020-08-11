import React, { useState, useContext } from "react";
import { Box, Button, Flex, Link, Text, Image } from "rebass";
import { Input } from "@rebass/forms";
import * as text from "../../text"
import { CategoryModel } from "../../models";
import { UserContext } from "../../context/UserContext";
import { postCategory } from "../../fetchers";
import { CREATED } from "node-kall";
import { CategoriesContext } from "../../context/CategoriesContext";


export const CategoryCreator = () => {

    const [name, setName] = useState("");
    const { authUser } = useContext(UserContext);
    const { refreshCategories } = useContext(CategoriesContext);

    const onCreateCategory = async () => {

        const category: CategoryModel = {
            name,
            owner_id: authUser.sub
        };

        const [status] = await postCategory(category);
        if (status === CREATED) {

            refreshCategories();
            setName("");
        } else {

            console.error(`Received ${status} when posting category.`);
            alert("Ups, en feil oppsto") //TODO: localize / prettify 
        }
    }

    return <>
        {/* <Box width={1 / 4} m="auto">
            <HelpButton />
        </Box> */}
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

