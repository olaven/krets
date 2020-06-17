import { useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex } from "rebass";
import { LoginButton } from "../tiny/buttons";
import { ResponseTextList } from "./ResponseTextList";
import { MoodGraph } from "./MoodGraph";

const AdminBox = ({ children }) => <Box
    width={[1, 1 / 2]}
    p={[1, 2, 3]}
>
    {children}
</Box>

export const AdminPage = () => {

    const { user } = useContext(UserContext);
    const { page, pageLoading } = useContext(AdminPageContext);

    if (pageLoading) {
        return <AdminBox>
            Laster side...
        </AdminBox>
    }

    if (!user) {
        return <LoginButton />
    }

    if (page && user.sub !== page.owner_id)
        return <AdminBox>
            Denne siden eier du ikke..
        </AdminBox>;

    return <Flex flexWrap="wrap">
        <AdminBox>
            <MoodGraph />
        </AdminBox>
        <AdminBox>
            <ResponseTextList />
        </AdminBox>
    </Flex>
}