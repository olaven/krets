import * as uiText from "../helpers/text";
import * as NextLink from 'next/link'
import { useRouter } from "next/router"
import { NO_CONTENT } from "node-kall";
import { Heading, Text, Flex, Box, Button, Link } from "rebass";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { deleteUser } from '../helpers/fetchers';
import { DoubleConfirmationButton } from "../components/standard/buttons";
import { TextBox } from "../components/standard/TextBox";
import { Loader } from "../components/standard/loader";

const DeleteAccount = () => {

    const { updateUser, authUser } = useContext(UserContext);
    const router = useRouter();

    const onDelete = async () => {

        const [status] = await deleteUser(authUser.sub);

        if (status === NO_CONTENT) {

            router.replace("/")
            updateUser();
        } else {

            alert("An error occured. Please contact post@krets.app and you'll be deleted as quickly as possible!");
        }
    }

    return <Box width={[1, 0.5]}>
        <DoubleConfirmationButton
            text={uiText.user.deleteButton}
            action={onDelete} />
    </Box>
}



const ActiveUserInfo = () => {

    const { authUser } = useContext(UserContext);

    //const product = useProduct(authUser?.sub);

    return <>
        <Heading as="h1">{uiText.upgrade.thanks.heading} {authUser?.name.split(" ")[0]} 🙌</Heading>
        <TextBox>
            {uiText.upgrade.thanks.aboutFeedback}
        </TextBox>
        <TextBox>
            {uiText.upgrade.thanks.aboutKrets}
        </TextBox>
        <TextBox>
            {uiText.upgrade.thanks.contactPrefix} <Link href={"mailto:post@krets.app"}>post@krets.app</Link>{uiText.upgrade.thanks.contactSuffix}
        </TextBox>
        <TextBox>
            - <Link href="https://olaven.org">Olav</Link> {uiText.upgrade.thanks.greetings}
        </TextBox>
    </>
}

const InactiveUserInfo = () => {

    const { authUser } = useContext(UserContext);
    console.log("her", authUser.sub);
    return <>
        <TextBox>{uiText.accountInfo.welcome} {authUser.name.split(" ")[0]} 👋</TextBox>
        <TextBox>
            {uiText.accountInfo.inactiveInfo}
        </TextBox>
        <TextBox>
            {uiText.upgrade.thanks.aboutKrets}
        </TextBox>
    </>
}

const PositiveAction = ({ href, text }: { href: string, text: string }) =>
    <Button width={[1, 0.5]} backgroundColor="primary" m={[1]}>
        <NextLink.default href={href} prefetch={true}>
            <a style={{ textDecoration: "none" }}>
                <Text color="secondary">{text}</Text>
            </a>
        </NextLink.default>
    </Button>

const ProfileInfo = () => {

    const { authUser, databaseUser, loading } = useContext(UserContext);

    const DynamicContent =
        authUser && databaseUser?.active ?
            <ActiveUserInfo /> :
            <InactiveUserInfo />

    const Info = () =>
        loading || !databaseUser ?
            <Loader size={150} /> :
            <>
                {DynamicContent}
                {databaseUser.active && <PositiveAction href="/" text={uiText.upgrade.back} />}
                <PositiveAction href="/guide" text={uiText.upgrade.getHelp} />
                <DeleteAccount />
            </>

    return loading || !databaseUser ?
        <Loader size={150} /> :
        <Flex>
            <Box width={[0, 1 / 3]} />
            <Box>
                <Info />
            </Box>
            <Box width={[0, 1 / 3]} />
        </Flex >
}


export default ProfileInfo; 