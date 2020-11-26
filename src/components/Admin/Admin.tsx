import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AdminPage } from "../../components/Admin/AdminPage";
import { SubscriberWrapper } from "../../components/SubscriberWrapper";
import { Loader } from "../../components/standard/loader";
import { AdminPageContextProvider } from "../../context/AdminPageContext";
import { CompareContextProvider } from "../../context/CompareContext";
import { PagesContextProvider } from "../../context/PagesContext";
import { UserContext } from "../../context/UserContext";
import { HomeContext } from "../../context/HomeContext";


export const Admin = () => {

    const { authUser } = useContext(UserContext); 
    const { selectedPage: page } = useContext(HomeContext); 

    return page ?
        <AdminPageContextProvider>
            <CompareContextProvider>
                <PagesContextProvider user={authUser}>
                    <AdminPage />
                </PagesContextProvider>
            </CompareContextProvider>
        </AdminPageContextProvider> :
        null
}