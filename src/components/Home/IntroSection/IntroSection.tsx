import {Button, Link} from "rebass";
import React from "react";

export const IntroSection = () => {

    return <div>
        Information about Krets innslag
        <Button>
            <Link color={"secondary"} href="/api/auth/login">Lag bruker!</Link>
        </Button>
    </div>
};