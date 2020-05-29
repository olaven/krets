import React from "react";
import {UserContext} from "../context/UserContext";
import {PageSection} from "../components/PageSection/PageSection";
import {IntroSection} from "../components/IntroSection/IntroSection";

const HomePage = () => {

    const { user } = React.useContext(UserContext);

    return user?
        <PageSection/>:
        <IntroSection/>
};

export default HomePage
