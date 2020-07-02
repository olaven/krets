import React, { useContext } from "react";
import { PagesContextProvider, PagesContext } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";
import { HelpContextProvider } from "../../../context/HelpContext";


const activateTooltipIfPagecount = (amount: number) =>
    () => {

        const { pages } = useContext(PagesContext);
        return pages.length === amount;
    }

export const PageSection = ({ user }) => <PagesContextProvider user={user}>
    <HelpContextProvider predicate={activateTooltipIfPagecount(0)}>
        <PageCreator />
    </HelpContextProvider>
    <HelpContextProvider predicate={activateTooltipIfPagecount(1)}>
        <PageList />
    </HelpContextProvider>
</PagesContextProvider>; 
