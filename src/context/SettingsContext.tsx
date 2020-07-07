import React, { createContext, useState } from "react";
import { usePage } from "../effects/usePage";
import { PageModel } from "../models";



interface ContextInterface {
    page: PageModel,
    pageLoading: boolean,
    updatePage: () => Promise<any>
}
const defaultValues: ContextInterface = {
    page: null,
    pageLoading: true,
    updatePage: async () => {
        console.error("Can't update page: SettingsContext not available")
    }
}

export const SettingsContext = createContext<ContextInterface>(defaultValues);

export const SettingsContextProvider = ({ pageId, children }) => {

    const [page, pageLoading, updatePage] = usePage(pageId);

    return <SettingsContext.Provider value={{ page, pageLoading, updatePage }}>
        {children}
    </SettingsContext.Provider>
};

