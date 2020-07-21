import React, { createContext, useEffect, useState } from "react";
import { getPages } from "../http/fetchers";
import { OK } from "../http/codes";
import { PageModel } from "../models";



export const PagesContext = createContext<{
    pages: PageModel[],
    refreshPages: () => Promise<any>
}>({
    pages: [], refreshPages: async () => { }
});

export const PagesContextProvider = ({ user, children }) => {

    if (!user) throw "Should not see this if not logged in!";

    const [pages, setPages] = useState<PageModel[]>([]);

    const refreshPages = async () => {

        const [status, pages] = await getPages()
        if (status === OK) {

            setPages(pages)
        } else {

            console.warn(`receieved ${status} when fetching brands`);
        }
    }

    useEffect(() => { refreshPages() }, [user]);

    return <PagesContext.Provider value={{ pages, refreshPages }}>
        {children}
    </PagesContext.Provider>
};

