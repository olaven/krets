import React from "react";
import { UserContext } from "../context/UserContext";
import { Home } from "../components/Home/Home/Home";
import { IntroSection } from "../components/Home/IntroSection/IntroSection";
import { Loader } from "../components/standard/loader";

const IndexPage = () => {

    const { authUser, loading } = React.useContext(UserContext);

    if (loading) return <Loader size={150} />
    return authUser ?
        <Home /> :
        <IntroSection />
};

export default IndexPage
