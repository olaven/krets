import React, {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import { get } from "../http/methods";


const usePages = (uid: string) => {

    const [pages, setPages] = useState([]);

    const refreshPages = async () => {

        const [ status, pages ] = await get("/api/pages");
        if (status === 200) {

            //TODO: pass type as generic to get when I have implemented shared DTO interfaces
            setPages(pages as any); 
        } else {

            console.warn(`Received ${status} when fetching brands..`);
        }
    };

    useEffect(() => {
        refreshPages()
    }, [uid]);

    return [pages, refreshPages];
};

//TODO: proper types
export const PagesContext = createContext({} as any);

export const PagesContextProvider = (props) => {

    const {user} = useContext(UserContext);
    if (!user) throw "Should not see this if not logged in!";

    const [pages, refreshPages] = usePages(user.sub);

    return <PagesContext.Provider value={{pages, refreshPages}}>
        {props.children}
    </PagesContext.Provider>
};
