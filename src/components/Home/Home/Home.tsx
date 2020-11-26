import React, { ReactElement, useContext, useState } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { HomeContextProvider, HomeContext } from "../../../context/HomeContext";
import { UserContext } from "../../../context/UserContext";
import { styled } from "../../../stiches.config";
import * as text from "../../../helpers/text";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { H1 } from "../../standard/Heading";
import { Button } from "../../standard/Button";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { PageCreator } from "./Pages/PageCreator";
import { PageList } from "./Pages/PageList";
import { Tabs } from "./Tabs";
import { Admin } from "../../Admin/Admin";
import { Settings } from "../../Settings/Settings";


const OuterContainer = styled("div", {
    display: "flex", 
    justifyContent: "center", 
});

const InnerContainer = styled(ColumnContainer, {
    alignContent: "center",
    width: "55vw", 
    small: {
        width: "100vw",
    }
});

const BackButton = styled(Button, {
    width: "10vw", 
    height: "10%",
    justifySelf: "flex-start", 
    ":hover": {

        boxShadow: "4px 4px 8px grey",
    },
    small: {
        width: "100%",
        alignSelf: "center", 
    }
})


export const HomeContent = () => {

    const { authUser } = useContext(UserContext);

    const  { selectedPage , setSelectedPage } = useContext(HomeContext); 
    const [component, setComponent] = useState<ReactElement>(null)

    return <OuterContainer>
        <InnerContainer>
        <PagesContextProvider user={authUser}>
                {
                    selectedPage? 
                        <>
                            <BackButton onClick={() => setSelectedPage(null)}>Tilbake</BackButton>
                            <H1>{selectedPage.name}</H1>  
                            <Tabs 
                                setComponent={setComponent}
                                elements={[
                                    { label: text.buttons.toSettings, Component: <Settings />},
                                    { label: text.buttons.toAdmin, Component: <Admin />}
                                ]}/>
                            {component}
                        </>: 
                        <>
                            <H1 underlined>{text.myPages.header}</H1>
                            <PageList />
                            <PageCreator />
                        </>
                }
            </PagesContextProvider >
        </InnerContainer>
    </OuterContainer>

}

export const Home = SubscriberWrapper(() =>
    <HomeContextProvider>
        <HomeContent />
    </HomeContextProvider>
)
