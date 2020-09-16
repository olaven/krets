import { Box, Button, Link, Flex, Text } from "rebass";
import React, { useState } from "react"
import * as uiText from "../../text"
import { Loader } from "./loader";

const HeaderButton = ({ href, text }: { href: string, text: string }) =>
    <Button backgroundColor={"secondary"} minWidth={"8em"}>
        <Link color={"primary"} href={href}>{text}</Link>
    </Button>;

export const LogoutButton = () =>
    <HeaderButton href="/api/auth/logout" text={uiText.buttons.logout} />;

export const LoginButton = () =>
    <HeaderButton href="/api/auth/login" text={uiText.buttons.login} />

export const MyPageButton = () =>
    <HeaderButton href="/user" text={uiText.buttons.myPage} />

export const GuidePageButton = () =>
    <HeaderButton href="/guide" text={uiText.buttons.guide} />


export const AboutButton = () => <Button backgroundColor={"secondary"} minWidth={"8em"}>
    <Link color={"primary"} href="/about">{uiText.buttons.aboutPage}</Link>
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
                {uiText.buttons.getStarted}
            </Text>}
        </Link>
    </Button>
    <Box width={[0, 0, 1 / 3]}></Box>
</Flex>

export const DoubleConfirmationButton = ({ text, action }) => {

    const [triggered, setTriggered] = useState(false);

    return triggered ?
        <Flex>
            <Button width={[1 / 2, 1 / 4]} onClick={() => { setTriggered(false) }} backgroundColor="primary" m={[1]}>
                <Text>{uiText.upgrade.notSure}</Text>
            </Button>
            <Button width={[1 / 2, 1 / 4]} onClick={action} backgroundColor="failure" m={[1]}>
                <Text>{uiText.upgrade.sure}</Text>
            </Button>
        </Flex > :
        <Button width={[1, 0.5]} onClick={() => { setTriggered(true) }} backgroundColor="failure" m={[1]} >
            <Text>{text}</Text>
        </Button >
}

export const TriggerLoadingButton = ({ text, loading, action }: { text: string, loading: boolean, action: () => any }) =>
    loading ?
        <Loader size={80} /> :
        <Button mx={1} onClick={action}>{text}</Button>


const ListButton = (href: string, text: string) =>
    <Box m={[1]}>
        <Button width={1}>
            <Link color={"secondary"} href={href}>
                {text}
            </Link>
        </Button>
    </Box >;

export const ToAdmin = ({ id }) =>
    ListButton(`/${id}/admin`, uiText.buttons.toAdmin);

export const ToQR = ({ id }) =>
    ListButton(`/${id}/code`, uiText.buttons.toQR);

export const ToPage = ({ id }) =>
    ListButton(`/${id}`, uiText.buttons.toPage);

export const ToSettings = ({ id }) =>
    ListButton(`/${id}/settings`, uiText.buttons.toSettings);


export const LoadMoreButton = ({ onClick }) =>
    <Button width={1} onClick={onClick}>
        {uiText.buttons.loadMore}
    </Button>
