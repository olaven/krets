import React, { createContext, useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { usePagination } from "../effects/usePagination";

type Type = {
    pages: PageModel[],
    moreAvailable: boolean,
    getNextPages: () => void,
    addPage: (page: PageModel) => void,
    removePage: (page: PageModel) => void,
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
    removePage: (page: PageModel) => { },
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

    /**
     * Adds a page to local list. 
     * Does _not_ sync with backend
     * @param page 
     */
    const addPage = (page: PageModel) => 
        setPages(
            [page, ...pages]
        )

    /**
     * Removes page from local list 
     * Does _not_ sync with backend
     * @param page 
     */
    const removePage = (page: PageModel) => 
        setPages(
            pages.filter(p => p.id !== page.id)
        ); 


    return <PagesContext.Provider value={{ pages, moreAvailable, getNextPages, addPage, removePage, hasLoaded, pageLoading}}>
        {children}
    </PagesContext.Provider>
};