import {Box, Button, Link} from "rebass";
import React from "react";

export const LogoutButton = () => <Button>
    <Link color={"secondary"} href="/api/auth/logout">Logg ut</Link>
</Button>;


export const LoginButton = props => <Button>
    <Link color={"secondary"} href="/api/auth/login">
        {props.text ? props.text : "Logg inn!"}
    </Link>
</Button>;


const ListButton = (href: string, icon: string) => <Box mx={[1, 2, 3]}>
    <Button>
        <Link color={"secondary"} href={href}>
            <span className="material-icons">
                {icon}
            </span>
        </Link>
    </Button>
</Box>;

export const ToAdmin = ({id}) =>
    ListButton(`/${id}/admin`, "admin_panel_settings");

export const ToQR = ({id}) =>
    ListButton(`/${id}/code`, "qr_code");
