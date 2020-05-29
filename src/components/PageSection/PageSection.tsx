import React, {useContext, useEffect, useState} from "react";
import {PagesContext, PagesContextProvider} from "../../context/PagesContext";
import {
    Label,
    Input,
    Select,
    Radio,
    Checkbox,
} from '@rebass/forms'
import {Box, Button, Flex, Heading, Text} from "rebass";

const PageCreator = () => {

    const [ name, setName ] = useState("");
    const [ id, setId ] = useState("");

    const nameToId = (name: string) => encodeURI(name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(/(Ø|ø)/g, "o")
        .replaceAll(/(Æ|æ)/g, "ae")
        .replaceAll(/(Å|å)/g, "aa"));


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

        if (response.status === 200) {

            //TODO: update list
            setName("");
            alert("Laget din Krets-side! :-D")
            //TODO: redirect?
        } else {

            alert("Det oppsto en liten feil i maskineriet..");
            console.error("Feil ved posting av ny side: ", response);
        }
    };

    return <Box
        as='form'
        onSubmit={e => e.preventDefault()}
        width={1/3}
    >
        <Heading>Lag ny side:</Heading>
        <Input onChange={({target: { value }}) => {setName(value)}}/>
        <Flex py={3}>
            <Text fontSize={3} width={2/3}>Din side: {`krets.app/${id}`}</Text>
            <Button width={1/3} onClick={postPage}>Lag</Button>
        </Flex>

    </Box>
};


export const PageList = () => {

    const {pages} = useContext(PagesContext);

    return <div>
        Dine krets-sider:
        {pages.map(page => <div>
            {page}
        </div>)}
    </div>

};

export const PageSection = () => (<PagesContextProvider>

    <PageCreator/>
    <PageList/>

</PagesContextProvider>);