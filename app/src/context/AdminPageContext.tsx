import React, { createContext, useState } from "react";
import { PageModel, ReseponseModel } from "../models";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";


interface ContextInterface {
    page: PageModel,
    pageLoading: boolean,
    responses: ReseponseModel[],
    responsesLoading: boolean
}
const defaultValues: ContextInterface =
    { page: null, pageLoading: true, responses: [], responsesLoading: true }

export const AdminPageContext = createContext<ContextInterface>(defaultValues);

export const AdminPageContextProvider = ({ pageId, children }) => {

    const [page, pageLoading] = usePage(pageId);
    const [responses, responsesLoading] = useResponses(pageId);

    return <AdminPageContext.Provider value={{ page, pageLoading, responses, responsesLoading }}>
        {children}
    </AdminPageContext.Provider>
};

