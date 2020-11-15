import React, { createContext, useContext } from "react";
import { PageModel, ResponseModel } from "../models/models";
import { HomeContext} from "./HomeContext";
import { useResponses } from "../effects/useResponses";


interface ContextInterface {
    page: PageModel,
    responses: ResponseModel[],
    responsesLoading: boolean,
    moreResponsesAvailable: boolean,
    getNextResponses: () => void,
}
const defaultValues: ContextInterface =
    { page: null, responsesLoading: true, responses: [], moreResponsesAvailable: true, getNextResponses: () => { } }

export const AdminPageContext = createContext<ContextInterface>(defaultValues);

export const AdminPageContextProvider = ({ pageId, children }) => {

    const { page } = useContext(HomeContext)
    const [responses, moreResponsesAvailable, responsesLoading, getNextResponses] = useResponses(page.id);

    return <AdminPageContext.Provider value={{ page, responses, moreResponsesAvailable, responsesLoading, getNextResponses }}>
        {children}
    </AdminPageContext.Provider>
};

