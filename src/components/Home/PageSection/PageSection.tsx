import React from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";
import { Explanation } from "./Explanation";


export const PageSection = ({ user }) =>
    <PagesContextProvider user={user}>
        <Explanation />
        <PageCreator />
        <PageList />
    </PagesContextProvider>
