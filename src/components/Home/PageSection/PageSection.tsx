import React from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";
import { Explanation } from "./Explanation";


export const PageSection = props => {

    const { user } = props;
    return <PagesContextProvider user={user}>
        <Explanation />
        <PageCreator />
        <PageList />
    </PagesContextProvider>
}