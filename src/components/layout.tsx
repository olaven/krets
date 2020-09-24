import { UserContext, UserContextProvider } from "../context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, Flex, Link, Text, Image } from "rebass";
import { AboutButton, GuidePageButton, LoginButton, LogoutButton, MyPageButton } from "./tiny/buttons";


const HeaderLogo = () =>
    <Flex color='primary' my={[1, 1, 2]} width={[1]}>
        <Link href="/">
            <Image
                src={"/logo.svg"}
                sx={{
                    width: ['7.5%'],
                }}
            />
        </Link >
        {/* <Text p={[0, 1, 2]} fontSize={7}>Krets.</Text> */}
    </Flex>

/**
 * Shows the CornerButtons unless on 
 * specified pages (code / feedback / embed)
 */
const CornerButtons = () => {

    const router = useRouter();
    const { authUser } = useContext(UserContext);

    if ([
        "/[pageId]", "/[pageId]/code", "/[pageId]/embed"
    ].includes(router.pathname)) {
        return null;
    }


    return authUser ?
        <>
            <GuidePageButton />
            <MyPageButton />
            <LogoutButton />
        </> :
        <>
            <GuidePageButton />
            <AboutButton />
            <LoginButton />
        </>
}

const withHeader = props => <Box
    minWidth={"100vw"}
    minHeight={"100vh"}
    sx={{
        m: 0,
        fontFamily: "body"
    }} backgroundColor={"secondary"}>
    <Flex px={2}
        color='primary'
        alignItems='center'>

        <HeaderLogo />
        <CornerButtons />
    </Flex>
    {props.children}
</Box>

export const Layout = (props) => {

    const router = useRouter();

    if (router.pathname.includes("/[pageId]/embed"))
        return <Box sx={{
            m: 0,
            fontFamily: "body"
        }}>
            {props.children}
        </Box >
    else
        return withHeader(props);
};