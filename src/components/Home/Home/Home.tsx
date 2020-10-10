import React, { useContext } from "react";
import { PagesContextProvider } from "../../../context/PagesContext";
import { UserContext } from "../../../context/UserContext";
import { SubscriberWrapper } from "../../SubscriberWrapper";
import { PageCreator } from "./PageCreator";
import { PageList } from "./PageList";

export const Home = SubscriberWrapper(() => {

    const { authUser } = useContext(UserContext);

    return <PagesContextProvider user={authUser}>
        <PageCreator />
        <PageList />
    </PagesContextProvider >
});
