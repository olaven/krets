import React, { createContext, useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { usePagination } from "../effects/usePagination";

type Type = {
    pages: PageModel[],
    getNextPages: () => void,
    addPage: (page: PageModel) => void
}

export const PagesContext = createContext<Type>({
    pages: [],
    getNextPages: () => { },
    addPage: (page: PageModel) => { }
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

    const [page, getNextPages] = usePagination<PageModel>(`/api/pages`);

    //A buffer keeping old `.data`
    const [pages, setPages] = useState<PageModel[]>([]);

    useEffect(() => {

        setPages(
            [...page.data, ...pages]
        )

    }, [page.next]);

    const addPage = (page: PageModel) => {

        setPages([page, ...pages]);
    }


    return <PagesContext.Provider value={{ pages, getNextPages, addPage }}>
        {children}
    </PagesContext.Provider>
};