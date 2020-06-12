import React from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";


export const PageSection = props => {

    const { user } = props;
    return <PagesContextProvider user={user}>
        <PageCreator />
        <PageList />
    </PagesContextProvider>
}