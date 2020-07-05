import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Box, Button, Link, Text } from "rebass";
import { AdminPage } from "../../components/Admin/AdminPage";
import { AdminPageContextProvider } from "../../context/AdminPageContext";


export default () => {

    const router = useRouter();
    const pageId = router.query.pageId as string; //NOTE: sometimes undefined figure out 
    if (!pageId) return <div>waiting</div>

    //TOOD multiple + some way to select pages
    return <AdminPageContextProvider pageIds={[pageId]}>
        <AdminPage />
    </AdminPageContextProvider>
};