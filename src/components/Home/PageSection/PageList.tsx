import React from "react";
import {Box, Card, Flex, Heading} from "rebass";
import {ToAdmin, ToQR} from "../../tiny/buttons";
import {borderStyle} from "styled-system";

const PageCard = ({id, name, responses}) => <Box m={[2, 3, 4]}>
    <Card sx={{borderTopStyle: "solid", borderColor: "primary", borderWidth: "1px"}}>

        <Heading mx={[1, 2, 3]} mt={[1 ,2, 3]} fontSize={[3, 4, 5]}>{name}</Heading>
        <Flex mb={[1, 2, 3]}>
            <ToAdmin id={id}/>
            <ToQR id={id}/>
        </Flex>
    </Card>
</Box>;

export const PageList = () => {

    //TODO: move back when server works
    //const {pages} = useContext(PagesContext);
    const pages = [
        {
            name: "Guros Kafe!",
            id: "guros-kafe",
            owner: {
                id: "google-oauth2|103130415679943370506" //NOTE: id of my test account
            },
            responses: [],
        },
        {
            name: "Foredrag om Markedsføring",
            id: "foredrag-markedsforing",
            owner: {
                id: "google-oauth2|103130415679943370506" //NOTE: id of my test account
            },
            responses: [],
        },
        {
            name: "Ny superkaffe!",
            id: "ny-superkaffe",
            owner: {
                id: "google-oauth2|103130415679943370506" //NOTE: id of my test account
            },
            responses: [],
        },
    ];

    return <Flex flexWrap={"wrap"} mt={[2, 3, 4]}>
        <Box width={1 / 4}></Box>
        <Box width={2 / 4}>
            <Heading color={"primary"} textAlign={"center"}>Mine krets-sider:</Heading>
            {pages.map(page => <PageCard key={page.id} {...page}/>)}
        </Box>
        <Box width={1 / 4}></Box>
    </Flex>
};
