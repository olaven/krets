import React, { createContext, useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { usePagination } from "../effects/usePagination";

type Type = {
    pages: PageModel[],
    moreAvailable: boolean,
    getNextPages: () => void,
    addPage: (page: PageModel) => void,
    /**
     * false -> before first load 
     * true  -> after first load 
     */
    hasLoaded: boolean,
    pageLoading
}

export const PagesContext = createContext<Type>({
    pages: [],
    moreAvailable: true,
    getNextPages: () => { },
    addPage: (page: PageModel) => { },
    hasLoaded: false,
    pageLoading: true
});

/**
 * Essentially a Wrapper for `usePagination`, keeping 
 * old paged data in a buffer. 
 * 
 * //NOTE: concidered moving to effect, but kept as context because 
 * it's state needs to be shared between multiple components, and 
 * I don't want to prop-drill. 
 */
export const PagesContextProvider = ({ user, children }) => {

    if (!user) throw "Should not see this if not logged in!";

    const [page, moreAvailable, pageLoading, getNextPages] = usePagination<PageModel>(`/api/pages`, 15);
    const [hasLoaded, setHasLoaded] = useState(false);

    //A buffer keeping old `.data`
    const [pages, setPages] = useState<PageModel[]>([]);

    useEffect(() => {

        setPages(
            [...page.data, ...pages]
        );

        if (page.next) setHasLoaded(true);
    }, [page.next]);

    const addPage = (page: PageModel) => {

        setPages([page, ...pages]);
    }


    return <PagesContext.Provider value={{ pages, moreAvailable, getNextPages, addPage, hasLoaded, pageLoading}}>
        {children}
    </PagesContext.Provider>
};