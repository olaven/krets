import React, {useContext} from "react";
import {Box, Card, Flex, Heading} from "rebass";
import {ToAdmin, ToQR} from "../../tiny/buttons";
import {borderStyle} from "styled-system";
import {PagesContext} from "../../../context/PagesContext";

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


    const {pages} = useContext(PagesContext);


    return <Flex flexWrap={"wrap"} mt={[2, 3, 4]}>
        <Box width={1 / 4}></Box>
        <Box width={2 / 4}>
            <Heading color={"primary"} textAlign={"center"}>Mine krets-sider:</Heading>
            {pages.map(page => <PageCard key={page.id} {...page}/>)}
        </Box>
        <Box width={1 / 4}></Box>
    </Flex>
};
