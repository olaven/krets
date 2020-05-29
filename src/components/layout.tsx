import {UserContext, UserContextProvider} from "../context/UserContext";
import React from "react";
import {Box, Button, Flex, Link, Text} from "rebass";

export const Layout = (props) => {

    const { user } = React.useContext(UserContext);


    const authButton = <Button color={"secondary"}>
        {user?
            <Link href="/api/auth/logout">Logg ut</Link>:
            <Link href="/api/auth/login">Logg inn</Link>}
    </Button>;

    return <div>
        <Flex px={2}
            color='primary'
            bg='secondary'
            alignItems='center'>
                <Text p={2} fontSize={7} fontWeight='bold'>Krets.</Text>
                <Box mx='auto' />
            {authButton}
        </Flex>
        {props.children}
        {/*<div>
            footer stuff
        </div>*/}
    </div>
};