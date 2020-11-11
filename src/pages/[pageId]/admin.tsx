import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AdminPage } from "../../components/Admin/AdminPage";
import { SubscriberWrapper } from "../../components/SubscriberWrapper";
import { Loader } from "../../components/standard/loader";
import { AdminPageContextProvider } from "../../context/AdminPageContext";
import { CompareContextProvider } from "../../context/CompareContext";
import { PagesContextProvider } from "../../context/PagesContext";
import { UserContext } from "../../context/UserContext";


export default SubscriberWrapper(() => {

    const { authUser } = useContext(UserContext)

    const router = useRouter();
    const pageId = router.query.pageId as string; //NOTE: sometimes undefined figure out 

    if (!pageId || !authUser) return <Loader size={150} />

    return <AdminPageContextProvider pageId={pageId}>
        <CompareContextProvider>
            <PagesContextProvider user={authUser}>
                <AdminPage />
            </PagesContextProvider>
        </CompareContextProvider>
    </AdminPageContextProvider>
});

//FIXME: temp replacement for `Admin`, as query.pageId will not be the source of page when new design is implmented
export const NewDesignAdmin = ({ pageId }) => {

    const { authUser } = useContext(UserContext)

    //TODO: use HomeContext instead of pageId prop
    return pageId ?
        <AdminPageContextProvider pageId={pageId}>
            <CompareContextProvider>
                <PagesContextProvider user={authUser}>
                    <AdminPage />
                </PagesContextProvider>
            </CompareContextProvider>
        </AdminPageContextProvider> :
        null
}