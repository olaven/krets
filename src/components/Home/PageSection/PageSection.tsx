import React from "react";
import {PagesContextProvider} from "../../../context/PagesContext";
import {PageCreator} from "./PageCreator";
import {PageList} from "./PageList";


export const PageSection = () => (<PagesContextProvider>

    <PageCreator/>
    <PageList/>

</PagesContextProvider>);