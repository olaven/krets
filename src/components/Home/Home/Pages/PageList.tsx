import React, { useContext, useEffect } from "react";
import { PageCard } from "./PageCard";
import { Loader, LoadMore } from "../../../standard/loader";
import { H1 } from "../../../standard/Heading";
import * as text from "../../../../text"
import { PagesContext } from "../../../../context/PagesContext";
import { HomeContext } from "../../../../context/HomeContext";


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
        <H1 underlined>{text.myPages.header}</H1>
        {!hasLoaded && <Loader size={50} />}
        {pages
            .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
            .map(page => <PageCard key={`${page.id}-${page.created_at}`} {...page} />)}
        {pages.length > 0 && <LoadMore onClick={getNextPages} active={moreAvailable} isLoading={pageLoading} />}
    </>
};
