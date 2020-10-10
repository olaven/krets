import React, { useContext } from "react";
import { Box, Card, Flex, Heading } from "rebass";
import { Loader, LoadMore } from "../../tiny/loader";
import * as text from "../../../text"
import { PagesContext } from "../../../context/PagesContext";
import { ToAdmin, ToQR, ToPage, ToSettings } from "../../tiny/buttons";

const PageCard = ({ id, name }) =>
    <Card sx={{ boxShadow: "0px 10px 20px .25px grey" }} p={[0, 1, 2]} my={[0, 1, 2]}>

        <Heading mx={[1, 2, 3]} mt={[1, 2, 3]} fontSize={[3, 4, 5]}>{name}</Heading>
        <Flex justifyContent="center">
            {/* FIXME: Tooltips added here has wrong position */}
            <Box width={[1 / 2]}>
                <ToAdmin id={id} />
                <ToSettings id={id} />
            </Box>
            <Box width={[1 / 2]}>
                <ToPage id={id} />
                <ToQR id={id} />
            </Box>
        </Flex>
    </Card>;


export const PageList = () => {

    const { pages, hasLoaded, pageLoading, moreAvailable, getNextPages } = useContext(PagesContext);

    return <>
        <Flex>
            <Box width={[0, 0, 1 / 4]}></Box>
            <Box width={[1, 1, 2 / 4]}>
                <Heading color={"primary"} textAlign={"center"}>{text.myPages.header}</Heading>
                {!hasLoaded && <Loader size={50} />}
                {pages
                    .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
                    .map(page => <PageCard key={`${page.id}-${page.created_at}`} {...page} />)}
                {pages.length > 0 && <LoadMore onClick={getNextPages} active={moreAvailable} isLoading={pageLoading} />}
            </Box>
            <Box width={[0, 0, 1 / 4]}></Box>
        </Flex>
    </>
};
