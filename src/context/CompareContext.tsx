import React, { createContext, useState, SetStateAction } from "react";
import { PageModel, ResponseModel } from "../models/models";
import { filterBody } from "node-kall";
import { getResponses, getPage } from "../fetchers";
import { asyncEffect } from "../effects/asyncEffect";


export type PageInformation = {
    page: PageModel,
    responses: ResponseModel[]
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

    asyncEffect(async () => {

        const pageInformations = await Promise.all(
            selected.map(async id => ({

                responses: (await filterBody(getResponses(id))).data,
                page: await filterBody(getPage(id))
            }))
        );

        setPageInformations(pageInformations)

    }, [selected.length]);


    return <CompareContext.Provider value={{ setSelected, pageInformations }}>
        {children}
    </CompareContext.Provider>
};

