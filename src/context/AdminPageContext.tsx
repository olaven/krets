import React, { createContext, useEffect, useState } from "react";
import { get } from "../http/methods";
import { OK } from "../http/codes";
import { PageModel } from "../models";
import { usePage } from "../effects/usePage";


//TODO: proper types
export const AdminPageContext = createContext<{ page: PageModel, loading: boolean }>({ page: null, loading: true });

export const AdminPageContextProvider = ({ pageId, children }) => {

    const [page, loading] = usePage(pageId);

    return <AdminPageContext.Provider value={{ page, loading }}>
        {children}
    </AdminPageContext.Provider>
};

