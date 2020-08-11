import React from "react";
import { UserContext } from "../context/UserContext";
import { PageSection } from "../components/Home/PageSection/PageSection";
import { IntroSection } from "../components/Home/IntroSection/IntroSection";

const IndexPage = () => {

    const { authUser } = React.useContext(UserContext);

    if (authUser) {

        return <PageSection user={authUser} />
    } else {

        return <IntroSection />
    }

};

export default IndexPage
