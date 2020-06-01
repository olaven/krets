import React from "react";
import {Card, Flex, Heading} from "rebass";
import {ToAdmin, ToQR} from "../../tiny/buttons";

const PageCard = ({id, name, responses}) => <Card width={256}>

    <Flex py={[4, 16, 32]}>
        <Heading width={1}>{name}</Heading>
        <ToAdmin id={id}/>
        <ToQR id={id}/>
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
        {pages.map(page => <PageCard key={page.id} {...page}/>)}
    </ul>

};
