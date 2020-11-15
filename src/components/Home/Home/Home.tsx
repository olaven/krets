import React, { ReactElement, useContext, useState } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { HomeContextProvider } from "../../../context/HomeContext";
import { UserContext } from "../../../context/UserContext";
import { styled } from "../../../stiches.config";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { PageCreator } from "./Pages/PageCreator";
import { PageList } from "./Pages/PageList";
import { Tabs } from "./Tabs";
import { NewDesignAdmin as Admin } from "../../../pages/[pageId]/admin"; //TODO: no loger page whe ndesign is doen 
import { Settings } from "../../Settings/Settings";



const Section = styled(ColumnContainer, {

    width: '50vw',

    small: {
        width: '100vw',
    },

    transition: "50ms ease",
});


export const HomeContent = () => {

    const { authUser } = useContext(UserContext);

    const [component, setComponent] = useState<ReactElement>(null)

    return <RowContainer>
        <Section>
            <Tabs
                setComponent={setComponent}
                elements={[
                    {
                        label: "Vis innstillinger",
                        Component: <Settings />,
                    },
                    {
                        label: "Se tilbakemeldinger",
                        Component: <Admin  />,
                    }
                ]} />
            {component}
        </Section>
        <Section>
            <PagesContextProvider user={authUser}>
                <PageList />
                <PageCreator />
            </PagesContextProvider >
        </Section>
    </RowContainer>

}

export const Home = SubscriberWrapper(() =>
    <HomeContextProvider>
        <HomeContent />
    </HomeContextProvider>
)
