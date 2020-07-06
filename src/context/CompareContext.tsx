import React, { createContext, useState, useEffect, SetStateAction } from "react";
import { PageModel, ReseponseModel } from "../models";
import { stripStatus } from "../http/methods";
import { getResponses, getPage } from "../http/fetchers";


export type PageInformation = {
    page: PageModel,
    responses: ReseponseModel[]
}

interface ContextInterface {
    setSelected: React.Dispatch<SetStateAction<string[]>>,
    pageInformations: PageInformation[]
}


export const CompareContext = createContext<ContextInterface>({
    setSelected: () => { },
    pageInformations: []
});

export const CompareContextProvider = ({ children }) => {

    const [selected, setSelected] = useState<string[]>([]);
    const [pageInformations, setPageInformations] = useState<PageInformation[]>([]);

    useEffect(() => {
        (async () => {

            const pageInformations = await Promise.all(selected.map(async id => ({

                responses: await stripStatus(getResponses(id)),
                page: await stripStatus(getPage(id))
            })));

            setPageInformations(pageInformations)
            console.log(pageInformations);
        })()
    }, [selected.length]);


    return <CompareContext.Provider value={{ setSelected, pageInformations }}>
        {children}
    </CompareContext.Provider>
};

