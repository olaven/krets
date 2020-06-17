import { UserContext, UserContextProvider } from "../context/UserContext";
import React from "react";
import { Box, Button, Flex, Link, Text, Image } from "rebass";
import { LoginButton, LogoutButton } from "./tiny/buttons";

const HeaderLogo = () => <Link href="/">
    <Flex color='primary' my={[0, 1, 2]}>
        <Image
            src={"/logo.svg"}
            sx={{
                width: ['7.5%'],
            }}
        />
        <Text p={[0, 1, 2]} fontSize={7}>Krets.</Text>
    </Flex>
</Link >

export const Layout = (props) => {

    const { user } = React.useContext(UserContext);


    const authButton = user ?
        <LogoutButton /> :
        <LoginButton />;

    return <Box

        minWidth={"100vw"}
        minHeight={"100vh"}
        sx={{
            m: 0,
        }} backgroundColor={"secondary"}>
        <Flex px={2}
            color='primary'
            alignItems='center'>

            <HeaderLogo />
            <Box mx='auto' />
            {authButton}
        </Flex>
        {props.children}
        {/*<div>
            footer stuff
        </div>*/}
    </Box>
};