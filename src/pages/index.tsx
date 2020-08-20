import React from "react";
import { UserContext } from "../context/UserContext";
import { PageSection } from "../components/Home/PageSection/PageSection";
import { IntroSection } from "../components/Home/IntroSection/IntroSection";
import { GetServerSidePropsContext } from "next";
import { get, OK } from "node-kall";

/* export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const host = context.req.headers.host
    console.log("host", host);
    const response = await fetch(`http://localhost:3000/api/auth/me`);

    const prefetchedAuthUser = response.status === 200 ?
        await response.json() :
        null

    console.log("response", response);
    return {
        props: {
            prefetchedAuthUser
        }
    }
} */

const IndexPage = () => {

    const { authUser, loading } = React.useContext(UserContext);

    if (loading) return <div>test hei</div>
    if (authUser) {

        return <PageSection user={authUser} />
    } else {

        return <IntroSection />
    }

};

export default IndexPage
