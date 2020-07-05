import React, { createContext, useEffect, useState, useContext, Dispatch } from "react";
import { PageModel, ReseponseModel } from "../models";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";
import PageId from "../pages/[pageId]";
import { get } from "../http/methods";
import { PagesContext } from "./PagesContext";


type PageInfo = {
    page: Promise<PageModel>,
    responses: Promise<ReseponseModel>
}[]

interface ContextInterface {
    pagesInfo: PageInfo[],
    loading: boolean,
    setSelectedPages: Dispatch<string[]>
}


export const AdminPageContext = createContext<ContextInterface>({ pagesInfo: [], loading: true, setSelectedPages: () => { } });

export const AdminPageContextProvider = ({ children }: { pageIds: string[], children: any }) => {

    const [selectedPages, setSelectedPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagesInfo, setPagesInfo] = useState<PageInfo[]>([]);

    useEffect(() => {

        setLoading(true);

        // load here 
        //TODO actually fetch and populat `pagesInfo`. 

        setLoading(false);
    }, [selectedPages.length]);

    return <AdminPageContext.Provider value={{ pagesInfo, loading, setSelectedPages }}>
        {children}
    </AdminPageContext.Provider>
};

