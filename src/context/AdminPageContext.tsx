import React, { createContext, useState } from "react";
import { PageModel, ResponseModel } from "../models/models";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";


interface ContextInterface {
    page: PageModel,
    pageLoading: boolean,
    responses: ResponseModel[],
    getNextResponses: () => void,
}
const defaultValues: ContextInterface =
    { page: null, pageLoading: true, responses: [], getNextResponses: () => { } }

export const AdminPageContext = createContext<ContextInterface>(defaultValues);

export const AdminPageContextProvider = ({ pageId, children }) => {

    const [page, pageLoading] = usePage(pageId);
    const [responses, getNextResponses] = useResponses(pageId);

    return <AdminPageContext.Provider value={{ page, pageLoading, responses, getNextResponses }}>
        {children}
    </AdminPageContext.Provider>
};

