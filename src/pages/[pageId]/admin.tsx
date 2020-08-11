import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AdminPage } from "../../components/Admin/AdminPage";
import { AdminPageContextProvider } from "../../context/AdminPageContext";
import { CompareContextProvider } from "../../context/CompareContext";
import { PagesContextProvider } from "../../context/PagesContext";
import { UserContext } from "../../context/UserContext";


export default () => {

    const { authUser } = useContext(UserContext)

    const router = useRouter();
    const pageId = router.query.pageId as string; //NOTE: sometimes undefined figure out 

    if (!pageId || !authUser) return <div>waiting</div>

    return <AdminPageContextProvider pageId={pageId}>
        <CompareContextProvider>
            <PagesContextProvider user={authUser}>
                <AdminPage />
            </PagesContextProvider>
        </CompareContextProvider>
    </AdminPageContextProvider>
};