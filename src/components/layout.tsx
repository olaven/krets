import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AboutButton, GuidePageButton, LoginButton, LogoutButton, MyPageButton } from "./standard/buttons";
import { styled } from "../stiches.config";
import { RowContainer } from "./standard/Containers";


const HeaderLogo = () => {

    const LogoLink = styled("a", {
        marginRight: "auto",

        mobile: {
            display: "none"
        }
    });

    const router = useRouter();

    return ["/[pageId]/embed"].includes(router.pathname) ?
        null :
        <LogoLink href="/">
            <img src={"/logo.svg"} height="100px"/>
        </LogoLink >
}
/**
 * Shows the CornerButtons unless on 
 * specified pages (code / feedback)
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

const FullScreen = styled("div", {
    position: "absolute", 
    width: "100vw", 
    height: "100vh", 
    backgroundColor: "$secondary",
    top: 0, 
    left: 0,
    minHeight: "100%"
});

const Header = styled(RowContainer, {
    marginTop: "$5", 
    marginLeft: "$5",
    justifyContent: "flex-end",
}); 

export const Layout = (props) => 
    <FullScreen>
        <Header>
            <HeaderLogo />
            <CornerButtons />
        </Header>
        {props.children}
    </FullScreen>