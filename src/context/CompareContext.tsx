import React, { createContext, useState, useEffect, SetStateAction } from "react";
import { PageModel, ReseponseModel } from "../models";
import { stripStatus } from "../http/methods";
import { getResponses, getPage } from "../http/fetchers";


interface ContextInterface {
    setSelected: React.Dispatch<SetStateAction<string[]>>,
    pages: PageModel[],
    responses: ReseponseModel[]
}


export const CompareContext = createContext<ContextInterface>({
    setSelected: () => { },
    pages: [],
    responses: []
});

export const CompareContextProvider = ({ children }) => {

    const [selected, setSelected] = useState<string[]>([]);
    const [responses, setResponses] = useState<ReseponseModel[]>()
    const [pages, setPages] = useState<PageModel[]>()

    useEffect(() => {
        (async () => {

            const data = selected.map(id => ({

                responses: stripStatus(getResponses(id)),
                page: stripStatus(getPage(id))
            }));

            const pages = await Promise.all(data.map(({ page }) => page))
            const responses = (await Promise.all(data.map(({ responses }) => responses))).flat()

            setPages(pages);
            setResponses(responses);
        })()
    }, [selected.length]);


    return <CompareContext.Provider value={{ setSelected, pages, responses }}>
        {children}
    </CompareContext.Provider>
};

