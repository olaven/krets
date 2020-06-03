import {useRouter} from "next/router";
import React, {useContext} from "react";
import {Box, Button, Link, Text} from "rebass";
import {UserContext} from "../../context/UserContext";
import {usePage} from "../../effects/usePage";
import {LoginButton} from "../../components/tiny/buttons";

export default () => {

    const router = useRouter();
    const pageId = router.query.pageId as string;

    const { user } = useContext(UserContext);
    const [ page, loading ]= usePage(pageId);

    if (loading)
        return <Text>Laster...</Text>;

    if (!user)
        return <LoginButton/>;

    if (user.sub !== page.owner_id)
        return <Box>
            Denne siden eier du ikke..
        </Box>;

    return <Box>
        TODO: implementer admin for {page.name};
    </Box>
};