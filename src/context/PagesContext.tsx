import React, { createContext, useEffect, useState } from "react";
import { PageModel } from "../models/models";
import { usePagination } from "../effects/usePagination";

type Type = {
    pages: PageModel[],
    getNextPages: () => void,
    resetPages: () => void
}

export const PagesContext = createContext<Type>({
    pages: [], getNextPages: () => { }, resetPagess: () => { }
});

/**
 * Essentially a Wrapper for `usePagination`, keeping 
 * old paged data in a buffer. 
 * 
 * THINKABOUT: make this an effect? 
 */
export const PagesContextProvider = ({ user, children }) => {

    if (!user) throw "Should not see this if not logged in!";

    const base = `/api/pages`;
    const [page, getNextPages, resetPages] = usePagination<PageModel>(base);

    //A buffer keeping old `.data`
    const [pages, setPages] = useState<PageModel[]>([]);

    useEffect(() => {

        setPages([...pages, ...page.data]);
    }, [page.next]);


    return <PagesContext.Provider value={{ pages, getNextPages, resetPages }}>
        {children}
    </PagesContext.Provider>
};

