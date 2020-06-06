import React from "react";
import {UserContext} from "../context/UserContext";
import {PageSection} from "../components/Home/PageSection/PageSection";
import {IntroSection} from "../components/Home/IntroSection/IntroSection";
import {Button} from "rebass";

const HomePage = () => {

    const { user } = React.useContext(UserContext);

    const responses = async () => {

        const response = await fetch("/api/pages/some-page/responses");
        if (response.status === 200) {

            console.log("hei", (await response.json()))
        } else {

            console.warn(response);
        }
    };
    return user?
        <PageSection/>:
        <div>
            <Button onClick={responses}>test fetch responses</Button>
            <IntroSection/>
        </div>
};

export default HomePage
