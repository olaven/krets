import React, { ReactElement, useContext, useState } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { HomeContextProvider } from "../../../context/HomeContext";
import { UserContext } from "../../../context/UserContext";
import { styled } from "../../../stiches.config";
import * as text from "../../../helpers/text";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { H1 } from "../../standard/Heading";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { PageCreator } from "./Pages/PageCreator";
import { PageList } from "./Pages/PageList";
import { Tabs } from "./Tabs";
import { Admin } from "../../Admin/Admin";
import { Settings } from "../../Settings/Settings";



const OuterContainer = styled("div", {
    display: "flex", 
    justifyContent: "center"
});

const InnerContainer = styled(ColumnContainer, {
    alignContent: "center",
    width: "55vw"
})


export const HomeContent = () => {

    const { authUser } = useContext(UserContext);

    const [component, setComponent] = useState<ReactElement>(null)

    return <OuterContainer>
        <InnerContainer>
        <PagesContextProvider user={authUser}>
                <H1 underlined>{text.myPages.header}</H1>
                <PageList />
                <PageCreator />
            </PagesContextProvider >
        </InnerContainer>
    </OuterContainer>

}

export const Home = SubscriberWrapper(() =>
    <HomeContextProvider>
        <HomeContent />
    </HomeContextProvider>
)
