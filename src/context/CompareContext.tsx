import React, { createContext, useState, useEffect } from "react";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";
import { PageModel, ReseponseModel } from "../models";
import { stripStatus } from "../http/methods";
import { getResponses } from "../http/fetchers";


interface ContextInterface {
    selected: string[],
    pages: Promise<PageModel[]>[],
    responses: Promise<ReseponseModel>[]
}


export const CompareContext = createContext<ContextInterface>({});

export const CompareContextProvider = ({ children }) => {

    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        (async () => {

            selected.map(id => ({
                responses: stripStatus(getResponses(id))
            }))
        })()
    }, [selected.length])


    return <CompareContext.Provider value={{ selected, setSelected, }}>
        {children}
    </CompareContext.Provider>
};

