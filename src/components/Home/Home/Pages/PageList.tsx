import React, { useContext} from "react";
import { PageCard } from "./PageCard";
import { Loader, LoadMore } from "../../../standard/loader";
import { PagesContext } from "../../../../context/PagesContext";
import { HomeContext } from "../../../../context/HomeContext";


export const PageList = () => {

    const { pages, hasLoaded, pageLoading, moreAvailable, getNextPages } = useContext(PagesContext);

    return <>
        {!hasLoaded && <Loader size={50} />}
        {pages
            .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
            .map(page => <PageCard key={`${page.id}-${page.created_at}`} {...page} />)}
        {pages.length > 0 && <LoadMore onClick={getNextPages} active={moreAvailable} isLoading={pageLoading} />}
    </>
};
