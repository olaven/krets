import { Box, Button, Link, Flex, Text } from "rebass";
import React from "react"
import * as text from "../../text"

export const LogoutButton = () => <Button backgroundColor={"secondary"} minWidth={"8em"}>
    <Link color={"primary"} href="/api/auth/logout">{text.buttons.logout}</Link>
</Button>;


export const LoginButton = () => <Button backgroundColor={"secondary"} minWidth={"8em"}>
    <Link color={"primary"} href="/api/auth/login">
        {text.buttons.login}
    </Link>
</Button>;

export const GetStartedButton = () => <Flex width={1} py={[0, 1, 2]}>
    <Box width={[0, 0, 1 / 3]}></Box>
    <Button
        sx={{
            boxShadow: '0px 10px 32px rgba(0, 0, 0, .5)'
        }}
        m="auto" width={[1 / 2, 1 / 2, 1 / 3]}>
        <Link color={"secondary"} href="/api/auth/login">
            {<Text fontSize={[2, 3, 4]}>
                {text.buttons.getStarted}
            </Text>}
        </Link>
    </Button>
    <Box width={[0, 0, 1 / 3]}></Box>
</Flex>


const ListButton = (href: string, text: string) => <Box mx={0}>
    <Button p={[0, 1, 2]}>
        <Link color={"secondary"} href={href}>
            {/* <span className="material-icons">
                {icon}
            </span> */}
            {text}
        </Link>
    </Button>
</Box>;

export const ToAdmin = ({ id }) =>
    ListButton(`/${id}/admin`, text.buttons.toAdmin /* "trending_up" */);

export const ToQR = ({ id }) =>
    ListButton(`/${id}/code`, text.buttons.toQR /* "qr_code" */);

export const ToPage = ({ id }) =>
    ListButton(`/${id}`, text.buttons.toPage /* "reply" */);