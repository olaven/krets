import React, { SetStateAction, createContext, useState } from "react";
import { PageModel } from "../models/models";
import { getPage } from "../fetchers";

interface IHomeContext {
    page?: PageModel,
    setPage: React.Dispatch<SetStateAction<PageModel>>,
    updatePage: () => Promise<any>,
}

export const HomeContext = createContext<IHomeContext>({
    page: null, setPage: (page: PageModel) => { }, updatePage: async () => { }
});


export const HomeContextProvider = ({ children }) => {

    const [page, setPage] = useState<PageModel>(null);

    const updatePage = async () => {
        const [status, updated] = await getPage(page.id);
        setPage(updated);
    }



    return <HomeContext.Provider value={{ page, setPage, updatePage }}>
        {children}
    </HomeContext.Provider>
};
