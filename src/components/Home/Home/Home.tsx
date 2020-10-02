import { useRouter } from "next/router";
import React, { useContext } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { UserContext } from "../../../context/UserContext";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { HomeTooltipProvider } from "./HomeTooltipProvider";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";

export const Home = SubscriberWrapper(() => {

    const { authUser } = useContext(UserContext);

    return <PagesContextProvider user={authUser}>
        <HomeTooltipProvider pageCount={0}>
            <PageCreator />
        </HomeTooltipProvider>
        <HomeTooltipProvider pageCount={-1}> {/* i.e. never show -> temporarily removed */}
            <PageList />
        </HomeTooltipProvider >
    </PagesContextProvider >
});
