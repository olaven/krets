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