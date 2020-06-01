import {Button, Link} from "rebass";
import React from "react";

export const LogoutButton = () => <Button>
    <Link color={"secondary"} href="/api/auth/logout">Logg ut</Link>
</Button>;


export const LoginButton = props => <Button>
    <Link color={"secondary"} href="/api/auth/login">
        {props.text? props.text: "Logg inn!"}
    </Link>
</Button>;


export const ToAdmin = ({ id }) => <Button>
    <Link color={"secondary"} href={`/${id}/admin`}>
        Admin
    </Link>
</Button>;

export const ToQR = ({ id }) => <Button>
    <Link color={"secondary"} href={`/${id}/code`}>
        Del!
    </Link>
</Button>;