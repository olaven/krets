import React, { SetStateAction, createContext, useState } from "react";
import { PageModel } from "../models/models";
import { getPage } from "../helpers/fetchers";

interface IHomeContext {
    selectedPage?: PageModel,
    setSelectedPage: React.Dispatch<SetStateAction<PageModel>>,
    updatePage: () => Promise<any>,
}

export const HomeContext = createContext<IHomeContext>({
    selectedPage: null, setSelectedPage: (page: PageModel) => { }, updatePage: async () => { }
});


export const HomeContextProvider = ({ children }) => {

    const [selectedPage, setSelectedPage] = useState<PageModel>(null);

    //THINKABOUT: Remove updatePage fetching and instead just update local copy? 
    const updatePage = async () => {
        const [status, updated] = await getPage(selectedPage.id);
        setSelectedPage(updated);
    }

    return <HomeContext.Provider value={{ selectedPage, setSelectedPage, updatePage }}>
        {children}
    </HomeContext.Provider>
};
