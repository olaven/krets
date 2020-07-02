import React, { useContext } from "react";
import { Box, Card, Flex, Heading } from "rebass";
import { ToAdmin, ToQR, ToPage } from "../../tiny/buttons";
import { PagesContext } from "../../../context/PagesContext";
import * as text from "../../../text"

const PageCard = ({ id, name }) => <Box>
    <Card sx={{ boxShadow: "0px 10px 20px .25px grey" }} p={[0, 1, 2]} my={[0, 1, 2]}>

        <Heading mx={[1, 2, 3]} mt={[1, 2, 3]} fontSize={[3, 4, 5]}>{name}</Heading>
        <Flex mb={[1, 2, 3]} flexWrap={"wrap"}>
            <ToAdmin id={id} />
            <ToQR id={id} />
            <ToPage id={id} />
        </Flex>
    </Card>
</Box>;

export const PageList = () => {

    const { pages } = useContext(PagesContext);

    return <Flex>
        <Box width={[0, 0, 1 / 4]}></Box>
        <Box width={[1, 1, 2 / 4]}>
            <Heading color={"primary"} textAlign={"center"}>{text.myPages.header}</Heading>
            {pages.map(page => <PageCard key={page.id} {...page} />)}
        </Box>
        <Box width={[0, 0, 1 / 4]}></Box>
    </Flex>
};
