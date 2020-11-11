import React, { SetStateAction, createContext, useState } from "react";
import { PageModel } from "../models/models";

interface IHomeContext {
    page?: PageModel,
    setPage: React.Dispatch<SetStateAction<PageModel>>,
}

export const HomeContext = createContext<IHomeContext>({
    page: null, setPage: (page: PageModel) => { }
});


export const HomeContextProvider = ({ children }) => {

    const [page, setPage] = useState(null);

    return <HomeContext.Provider value={{ page, setPage }}>
        {children}
    </HomeContext.Provider>
};