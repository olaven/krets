import React, { createContext, useEffect, useState } from "react";
import { get } from "../http/methods";
import { OK } from "../http/codes";
import { PageModel } from "../models";


//TODO: proper types
export const PagesContext = createContext({} as any);

export const PagesContextProvider = ({ user, children }) => {

    if (!user) throw "Should not see this if not logged in!";

    const [pages, setPages] = useState<PageModel[]>([]);

    const refreshPages = async () => {

        console.log("refreshing pagse");

        const [status, pages] = await get<PageModel[]>("/api/pages");
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

