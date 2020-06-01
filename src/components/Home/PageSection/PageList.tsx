import React from "react";
import {Box, Card, Flex, Heading} from "rebass";
import {ToAdmin, ToQR} from "../../tiny/buttons";

const PageCard = ({id, name, responses}) => <Box width={[1, 1/2]}>
    <Card width={256}>

        <Flex my={[0, 2, 3]}>
            <Heading fontSize={[3, 4, 5]}>{name}</Heading>
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

    return <Box>
        <Heading>Dine krets-sider:</Heading>
        <Flex flexWrap={"wrap"}>
            {pages.map(page => <PageCard key={page.id} {...page}/>)}
        </Flex>
    </Box>

};
