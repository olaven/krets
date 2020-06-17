import { Box, Button, Link } from "rebass";
import React from "react";

export const LogoutButton = () => <Button backgroundColor={"secondary"}>
    <Link color={"primary"} href="/api/auth/logout">Logg ut</Link>
</Button>;


export const LoginButton = props => <Button>
    <Link color={"secondary"} href="/api/auth/login">
        {props.text ? props.text : "Logg inn"}
    </Link>
</Button>;


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