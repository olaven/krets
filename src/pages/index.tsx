import React from "react";
import { UserContext } from "../context/UserContext";
import { PageSection } from "../components/Home/PageSection/PageSection";
import { IntroSection } from "../components/Home/IntroSection/IntroSection";
import { Loader } from "../components/tiny/loader";

const IndexPage = () => {

    const { authUser, loading } = React.useContext(UserContext);

    if (loading) return <Loader size={150} />
    return authUser ?
        <PageSection user={authUser} /> :
        <IntroSection />
};

export default IndexPage
