import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Flex, Heading, Text} from "rebass";
import {Input} from "@rebass/forms"
import {PagesContext} from "../../../context/PagesContext";

export const PageCreator = () => {

    const { refreshPages } = useContext(PagesContext);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const nameToId = (name: string) => encodeURI(name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(/(Ø|ø)/g, "o")
        .replaceAll(/(Æ|æ)/g, "ae")
        .replaceAll(/(Å|å)/g, "aa")
        .replaceAll("?", "")
        .replaceAll("!", "")
    );


    useEffect(() => {

        setId(nameToId(name))
    }, [name]);


    const postPage = async () => {

        const page = {
            id, name
        };

        const response = await fetch("/api/pages", {
            method: "POST",
            body: JSON.stringify(page)
        });

        if (response.status === 201) {

            setName("");
            refreshPages();
        } else {

            alert("Det oppsto en liten feil i maskineriet..");
            console.error("Feil ved posting av ny side: ", response);
        }
    };

    return <Flex py={[1, 2, 3]}>
        <Box width={1/3}/>
        <Box
            as='form'
            onSubmit={e => e.preventDefault()}
            width={2/ 4}
        >
            {name && <Text fontSize={3} width={1}>Din side: {`krets.app/${id}`}</Text>}

            <Flex>
                <Input placeholder={"Lag ny side"} onChange={({target: {value}}) => {
                    setName(value)
                }}/>
                <Button mx={[0, 2, 3]} width={1 / 3} onClick={postPage}>Lag</Button>
            </Flex>

        </Box>
        <Box width={1/3}/>
    </Flex>


};