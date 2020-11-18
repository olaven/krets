import React, { createContext, useEffect, useState } from "react";
import { getCategories } from "../helpers/fetchers";
import { CategoryModel } from "../models/models";
import { OK } from "node-kall";


//TODO: proper types
export const CategoriesContext = createContext<{
    categories: CategoryModel[],
    refreshCategories: () => Promise<any>
}>({
    categories: [], refreshCategories: async () => { }
});

export const CategoriesContextProvider = ({ user, children }) => {

    if (!user) throw "Should not see this if not logged in!";

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const refreshCategories = async () => {

        const [code, categories] = await getCategories();
        if (code === OK) {

            setCategories(categories);
        } else {

            console.error(`Received ${code} when fetching categories`);
        }
    };

    //Calling refresh on load
    useEffect(() => { refreshCategories() }, []);


    return <CategoriesContext.Provider value={{ categories, refreshCategories }}>
        {children}
    </CategoriesContext.Provider>
};

