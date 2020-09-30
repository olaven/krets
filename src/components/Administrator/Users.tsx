import { NO_CONTENT } from "node-kall";
import { Box, Card, Flex, Heading, Text } from "rebass";
import { useUsers } from "../../effects/useUsers"
import { putUser } from "../../fetchers";
import { UserModel } from "../../models/models";
import { DoubleConfirmationButton, TriggerLoadingButton } from "../tiny/buttons";

const onToggle = (user: UserModel) =>
    async () => {

        const [status] = await putUser(user);
        if (status === NO_CONTENT) {

            //TODO: update viewed user 
            //THINKABOUT: update user in common context, with /users/[id].ts endpoint? Requires access on that endpoint for admins 
        }
    }

const ActiveToggle = ({ user }: { user: UserModel }) =>
    <TriggerLoadingButton
        text={user.active ? "fjern aktiv" : "Gjør aktiv"}
        action={onToggle({
            ...user,
            active: !user.active
        })}
    />


const AdminToggle = ({ user }: { user: UserModel }) =>
    <DoubleConfirmationButton
        text={user.role === "administrator" ? "fjern admin" : "gjør til admin"}
        action={onToggle({
            ...user,
            role: user.role === "administrator" ? "basic" : "administrator"
        })}
    />


const UserCard = ({ user }: { user: UserModel }) =>
    <Card p={[0, 1, 2]} m={[0, 1, 2]}>
        <Heading>{user.id}</Heading>
        <Text>active: {user.active ? "ja" : "nei"}</Text>
        <Text>role: {user.role}</Text>
        <ActiveToggle user={user} />
        <AdminToggle user={user} />
    </Card>


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