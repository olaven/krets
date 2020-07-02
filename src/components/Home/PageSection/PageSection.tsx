import React, { useContext } from "react";
import { PagesContextProvider, PagesContext } from "../../../context/PagesContext";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";
import { Explanation } from "./Explanation";
import { HelpContextProvider, HelpContext } from "../../../context/HelpContext";


const PageSectionContent = () => {

    const { HelpButton } = useContext(HelpContext);

    return <>
        <HelpButton margin="auto" width={[1, 1, 1 / 4]} />
        <PageCreator />
        <PageList />
    </>
}


export const PageSection = ({ user }) => {

    return <PagesContextProvider user={user}>
        <HelpContextProvider predicate={() => {

            const { pages } = useContext(PagesContext)
            return pages.length === 0;
        }}>
            <PageSectionContent />
        </HelpContextProvider>
    </PagesContextProvider>

}
