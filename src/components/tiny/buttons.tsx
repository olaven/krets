import { Box, Button, Link, Flex, Text } from "rebass";
import React from "react";

export const LogoutButton = () => <Button backgroundColor={"secondary"}>
    <Link color={"primary"} href="/api/auth/logout">Logg ut</Link>
</Button>;


export const LoginButton = () => <Button backgroundColor={"secondary"}>
    <Link color={"primary"} href="/api/auth/login">
        {"Logg inn"}
    </Link>
</Button>;

export const GetStartedButton = () => <Flex width={1} py={[0, 1, 2]}>
    <Box width={1 / 3}></Box>
    <Button
        m="auto" width={1 / 3}>
        <Link color={"secondary"} href="/api/auth/login">
            {<Text fontSize={[2, 3, 4]}>
                Kom i gang!
            </Text>}
        </Link>
    </Button>
    <Box width={1 / 3}></Box>
</Flex>


const ListButton = (href: string, icon: string) => <Box mx={[0, 1, 2]}>
    <Button p={[0, 1, 2]}>
        <Link color={"secondary"} href={href}>
            <span className="material-icons">
                {icon}
            </span>
        </Link>
    </Button>
</Box>;

export const ToAdmin = ({ id }) =>
    ListButton(`/${id}/admin`, "trending_up");

export const ToQR = ({ id }) =>
    ListButton(`/${id}/code`, "qr_code");

export const ToPage = ({ id }) =>
    ListButton(`/${id}`, "reply")