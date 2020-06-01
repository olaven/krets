import React, {useContext} from "react";
import {PagesContext} from "../../../context/PagesContext";
import {Box, Card, Flex, Heading, Link} from "rebass";
import {ToAdmin, ToQR} from "../../tiny/buttons";
import responses from "../../../pages/api/pages/[id]/responses";

const PageCard = ({id, name, responses}) => <Card width={256}>

    <Heading>{name}</Heading>
    <Flex>
        <Box>
            <ToAdmin id={id}/>
        </Box>
        <Box>
            <ToQR id={id}/>
        </Box>
    </Flex>
</Card>;

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

    return <ul>
        Dine krets-sider:
        {pages.map(page => <PageCard {...page}/>)}
    </ul>

};
