import { NO_CONTENT, OK } from "node-kall";
import { Button, Card, Heading, Text } from "rebass";
import { useState } from "react";
import { getAuthUser, putUserAdmin } from "../../helpers/fetchers";
import { AuthModel, UserModel } from "../../models/models";
import { DoubleConfirmationButton, TriggerLoadingButton } from "../standard/buttons";

const onToggle = (user: UserModel) =>
    async () => {

        const [status] = await putUserAdmin(user);
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


export const UserCard = ({ user }: { user: UserModel }) => {

    const [authUser, setAuthUser] = useState<AuthModel>(null);

    const loadAuth = async () => {


        try {

            const [status, authUser] = await getAuthUser(user);
            if (status === OK) {

                setAuthUser(authUser);
            } else {

                console.error(`${status} when fetching authUser..`);
            }
        } catch (error) {

            //THINKABOUT: how to solve this properly
            //swallow -> if running locally, this error is due to test users not having auth0-counterparts
        }
    }
    /* 
    NOTE: TEmpl replaced with specific loading due to authp 409 limits
    asyncEffect(async () => {

        try {

            const [status, authUser] = await getAuthUser(user);
            if (status === OK) {

                setAuthUser(authUser);
            } else {

                console.error(`${status} when fetching authUser..`);
            }
        } catch (error) {

            //THINKABOUT: how to solve this properly
            //swallow -> if running locally, this error is due to test users not having auth0-counterparts
        }
    }, []); */

    return <Card p={[0, 1, 2]} m={[0, 1, 2]}>
        <Heading fontSize={[13, 21]}>{authUser ? authUser.name : "laster auth navn.."}</Heading>
        <Heading fontSize={[8, 13]}>{authUser ? authUser.email : "laster auth e-post.."}</Heading>
        <Heading fontSize={[8, 13]}>{user.contact_email}</Heading>
        <Text>id: {user.id}</Text>
        <Text>active: {user.active ? "ja" : "nei"}</Text>
        <Text>role: {user.role}</Text>
        <ActiveToggle user={user} />
        <AdminToggle user={user} />
        <Button onClick={loadAuth}>Last inn auth-data</Button>
    </Card>
}
