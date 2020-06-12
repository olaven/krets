import React from "react";
import { UserContext } from "../context/UserContext";
import { PageSection } from "../components/Home/PageSection/PageSection";
import { IntroSection } from "../components/Home/IntroSection/IntroSection";

const IndexPage = () => {

    const { user } = React.useContext(UserContext);

    if (user) {

        return <PageSection user={user} />
    } else {

        return <IntroSection />
    }

};

export default IndexPage
