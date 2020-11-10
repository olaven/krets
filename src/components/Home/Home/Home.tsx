import React, { useContext } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { UserContext } from "../../../context/UserContext";
import { styled } from "../../../stiches.config";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { PageCreator } from "./Pages/PageCreator";
import { PageList } from "./Pages/PageList";
import { Tabs } from "./Tabs";
import { NewDesignSettings as Settings } from "../../../pages/[pageId]/settings"; //TODO: no loger page whe ndesign is doen 



const Section = styled(ColumnContainer, {

    //border: 'solid black 1px',

    width: '50vw',

    small: {
        width: '100vw',
    },
});


export const Home = SubscriberWrapper(() => {

    const { authUser } = useContext(UserContext);

    return <RowContainer>
        <Section>
            <Tabs />
            <Settings pageId="side" />
        </Section>
        <Section>
            <PagesContextProvider user={authUser}>
                <PageList />
                <PageCreator />
            </PagesContextProvider >
        </Section>
    </RowContainer>
});
