import { Box, Button, Card, Flex, Heading } from "rebass";
import { ToAdmin, ToQR, ToPage, ToSettings, LoadMoreButton } from "../../tiny/buttons";
import React, { useContext } from "react";
import { PagesContext } from "../../../context/PagesContext";
import * as text from "../../../text"
import { TooltipHelp } from "tooltip-help-react";
import { Loader } from "../../tiny/loader";

const PageCard = ({ id, name }) =>
    <Card sx={{ boxShadow: "0px 10px 20px .25px grey" }} p={[0, 1, 2]} my={[0, 1, 2]}>

        <Heading mx={[1, 2, 3]} mt={[1, 2, 3]} fontSize={[3, 4, 5]}>{name}</Heading>
        <Flex flexWrap={"wrap"}>
            {/* FIXME: Tooltips added here has wrong position */}
            <ToAdmin id={id} />
            <ToQR id={id} />
            <ToPage id={id} />
            <ToSettings id={id} />
        </Flex>
    </Card>;


export const PageList = () => {

    const { pages, hasLoaded, moreAvailable, getNextPages } = useContext(PagesContext);
    const { Tooltip, HelpButton } = useContext(TooltipHelp)

    return <>
        <Flex>
            <Box width={[0, 0, 1 / 4]}></Box>
            <Box width={[1, 1, 2 / 4]}>
                <Tooltip content={text.tooltips.pageList}>
                    <Heading color={"primary"} textAlign={"center"}>{text.myPages.header}</Heading>
                </Tooltip>
                <HelpButton />
                {!hasLoaded && <Loader size={10} />}
                {pages
                    .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
                    .map(page => <PageCard key={page.id} {...page} />)}
                {pages.length > 0 && <LoadMoreButton onClick={getNextPages} active={moreAvailable} />}
            </Box>
            <Box width={[0, 0, 1 / 4]}></Box>
        </Flex>
    </>
};
