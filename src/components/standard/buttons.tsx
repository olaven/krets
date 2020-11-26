import { Box, Button, Link, Flex, Text } from "rebass";
import React, { useState } from "react"
import * as uiText from "../../helpers/text"
import { Button as StitchesButton } from "./Button" // Planned to replace Rebass Button
import { Loader } from "./loader";
import { RowContainer } from "./Containers";

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

//FIXME: Potentially removable -  not used after invoice-only.
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
        <RowContainer>
            <StitchesButton onClick={() => { setTriggered(false) }}>
                {uiText.upgrade.notSure}
            </StitchesButton>
            <StitchesButton onClick={action} danger >
                {uiText.upgrade.sure}
            </StitchesButton>
        </RowContainer > :
        <StitchesButton onClick={() => { setTriggered(true) }} danger >
            {text}
        </StitchesButton >
}

export const TriggerLoadingButton = ({ text, action, backgroundColor, label }: { text: string, action: () => any, backgroundColor?: string, label?: string }) => {

    const [loading, setLoading] = useState(false);

    return loading ?
        <Loader size={80} /> :
        <StitchesButton
            aria-label={label}
            onClick={async () => {

                setLoading(true);
                await action();
                setLoading(false);
            }}
        >{text}</StitchesButton>
}



const ListButton = (href: string, text: string) => (

    <StitchesButton inverted>
        <a style={{color: "inherit", textDecoration: "none"}} href={href}>
            {text}
        </a>
    </StitchesButton>

)



export const ToAdmin = ({ id }) =>
    ListButton(`/${id}/admin`, uiText.buttons.toAdmin);

export const ToQR = ({ id }) =>
    ListButton(`/${id}/code`, uiText.buttons.toQR);

export const ToPage = ({ id }) =>
    ListButton(`/${id}`, uiText.buttons.toPage);

export const ToSettings = ({ id }) =>
    ListButton(`/${id}/settings`, uiText.buttons.toSettings);


//NOTE: Deprecated, should be replaced over time with a normal button. 
export const LoadMoreButton = ({ onClick }) =>
    <Button width={1} onClick={onClick}>
        {uiText.buttons.loadMore}
    </Button>
