import { useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContextProvider, AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex } from "rebass";
import { LoginButton } from "../tiny/buttons";
import { ResponseTextList } from "./ResponseTextList";
import { MoodGraph } from "./MoodGraph";

export const AdminPage = () => {

    const { user } = useContext(UserContext);
    const { page, loading } = useContext(AdminPageContext);

    if (loading) {
        return <Box>
            Laster side...
        </Box>
    }

    if (!user) {
        return <LoginButton />
    }

    if (page && user.sub !== page.owner_id)
        return <Box>
            Denne siden eier du ikke..
        </Box>;

    return <Flex>
        <Box width={1 / 2}>
            <MoodGraph />
        </Box>
        <Box width={1 / 2}>
            <ResponseTextList />
        </Box>
    </Flex>
}