import { useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex } from "rebass";
import { LoginButton } from "../tiny/buttons";
import { ResponseTextList } from "./ResponseTextList";
import { MoodGraph } from "./MoodGraph";
import * as text from "../../text"

const AdminBox = ({ children }) => <Box
    width={[1, 1 / 2]}
    p={[1, 2, 3]}
>
    {children}
</Box>

export const AdminPage = async () => {

    const { user } = useContext(UserContext);
    const { awaitingAdminInfo, loading } = useContext(AdminPageContext);

    if (loading) {
        return <AdminBox>
            {text.adminPage.loading}
        </AdminBox>
    }

    if (!user) {
        return <LoginButton />
    }


    if ((await awaitingAdminInfo[0]) && user.sub !== (await awaitingAdminInfo[0]).page.owner_id)
        return <AdminBox>
            {text.adminPage.notOwning}
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