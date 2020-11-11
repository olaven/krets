import React, { useContext, useEffect } from "react";
import { Box, Card, Flex, Heading } from "rebass";
import { Loader, LoadMore } from "../../../standard/loader";
import * as text from "../../../../text"
import { PagesContext } from "../../../../context/PagesContext";
import { HomeContext } from "../../../../context/HomeContext";
import { ToAdmin, ToQR, ToPage, ToSettings } from "../../../standard/buttons";
import { css, styled } from "../../../../stiches.config";

const random = (max: number) => Math.floor(Math.random() * max + 1)

const AppearContainer = styled("div", {
    animationDuration: `800ms`,
    animmationDirection: "forwards",
    animationTimingFunction: "linear",
    animationName: `${css.keyframes({
        "0%": {
            opacity: 0,
            transform: `translateX(5%)`,
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0%)",
        }
    })}`
})

const PageCard = (page) => {

    const { setPage } = useContext(HomeContext);

    return <AppearContainer style={{ animationDuration: `${random(500)}ms` }}>

        <Card sx={{ boxShadow: "0px 10px 20px .25px grey" }} p={[0, 1, 2]} my={[0, 1, 2]}>
            <button onClick={() => { setPage(page) }}>test select click</button>
            <Heading mx={[1, 2, 3]} mt={[1, 2, 3]} fontSize={[3, 4, 5]}>{page.name}</Heading>
            <Flex justifyContent="center">
                <Box width={[1 / 2]}>
                    <ToAdmin id={page.id} />
                    <ToSettings id={page.id} />
                </Box>
                <Box width={[1 / 2]}>
                    <ToPage id={page.id} />
                    <ToQR id={page.id} />
                </Box>
            </Flex>
        </Card>
    </AppearContainer >
}


export const PageList = () => {

    const { setPage } = useContext(HomeContext);
    const { pages, hasLoaded, pageLoading, moreAvailable, getNextPages } = useContext(PagesContext);

    useEffect(() => {

        if (pages.length) {

            const [firstPage] = pages;
            setPage(firstPage);
        }
    }, [pages.length])

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
