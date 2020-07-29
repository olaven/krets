import { useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContext } from "../../context/AdminPageContext";
import { Box, Flex } from "rebass";
import { LoginButton } from "../tiny/buttons";
import { TextList } from "./TextList/TextList";
import { Charts } from "./Charts/Charts";
import * as text from "../../text"
import { CompareSelect } from "./CompareSelect";

const AdminBox = props => <Box
    width={props.width ? props.width : [1, 1 / 2]}
    p={[1, 2, 3]}
>
    {props.children}
</Box>

const AdminContent = () => <Flex flexWrap="wrap">
    <AdminBox width={1}>
        <CompareSelect />
    </AdminBox>
    <AdminBox>
        <Charts />
    </AdminBox>
    <AdminBox>
        <TextList />
    </AdminBox>
</Flex>

export const AdminPage = () => {

    const { user } = useContext(UserContext);
    const { page, pageLoading } = useContext(AdminPageContext);

    if (pageLoading) {
        return <AdminBox>
            {text.adminPage.loading}
        </AdminBox>
    }

    if (!user) {
        return <LoginButton />
    }

    if (page && user.sub !== page.owner_id)
        return <AdminBox>
            {text.adminPage.notOwning}
        </AdminBox>;

    return <AdminContent />
}