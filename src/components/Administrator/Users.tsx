import { Box, Flex, } from "rebass";
import { useUsers } from "../../effects/useUsers"
import { TriggerLoadingButton } from "../tiny/buttons";
import { UserCard } from "./UserCard";





export const Users = () => {

    const [users, moreAvailable, pageLoading, getNextPages] = useUsers();

    return <Box>
        <Flex flexWrap="wrap">
            {users.map(user =>
                <UserCard key={user.id} user={user} />)}
        </Flex>
        <TriggerLoadingButton
            text={"last flere"}
            action={getNextPages} />
    </Box>
}