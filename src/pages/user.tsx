import * as uiText from "../text";
import * as NextLink from 'next/link'
import { useRouter } from "next/router"
import { OK, NO_CONTENT } from "node-kall";
import { Heading, Text, Flex, Box, Button, Link } from "rebass";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { deleteSubscription, deleteUser } from '../fetchers';
import Loader from 'react-spinners/BounceLoader';
import { useProduct } from "../effects/useProduct";
import { DoubleConfirmationButton } from "../components/tiny/buttons";
import { TextBox } from "../components/tiny/TextBox";
import { ShareVideo } from "../components/Videos";

const CancelSubscription = () => {

    const { updateUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onCancel = async () => {

        setLoading(true);

        const [status] = await deleteSubscription();
        if (status === OK) updateUser();
        else setError(true);

        setLoading(false);
    }

    if (loading) {
        return <Loader size={50} />
    }

    if (error) {
        return <Text fontSize={[2, 3, 4]}>
            {uiText.upgrade.cancellationError} <Link href={"mailto:post@krets.app"}>{uiText.upgrade.cancelContact}</Link>{uiText.upgrade.cancelSuffix}
        </Text>
    }

    return <DoubleConfirmationButton
        action={onCancel}
        text={uiText.upgrade.cancel}
    />
}

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

    return <DoubleConfirmationButton
        text={uiText.user.deleteButton}
        action={onDelete} />
}



const SubscriberInfo = () => {

    const { authUser } = useContext(UserContext);

    const product = useProduct(authUser?.sub);

    return <>
        <Heading as="h1">{uiText.upgrade.thanks.heading} {authUser?.name.split(" ")[0]} 🙌</Heading>
        <TextBox>{uiText.upgrade.thanks.subscription} <span style={{
            borderColor: "teal",
            borderStyle: "solid",
            padding: "5px"
        }}>{product?.name}</span> </TextBox>
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

const NonSubscriber = () => {

    const { authUser } = useContext(UserContext);

    return <>
        <TextBox>Hey, {authUser.name.split(" ")[0]} 👋</TextBox>
        <TextBox>
            {uiText.upgrade.thanks.aboutFeedback}
        </TextBox>
        <TextBox>
            {uiText.upgrade.thanks.aboutKrets}
        </TextBox>
        <TextBox>
            {uiText.upgrade.salesArgument}
            <Link href="/upgrade"> {uiText.upgrade.button}</Link> {uiText.upgrade.includedAsSubscriber}
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
        authUser && databaseUser?.subscription_id ?
            <SubscriberInfo /> :
            <NonSubscriber />

    const DynamicButton =
        databaseUser?.subscription_id ?
            <>
                <PositiveAction href="/" text={uiText.upgrade.back} />
                <CancelSubscription />
            </> :
            <>
                <PositiveAction href="/subscription" text={uiText.upgrade.button} />
                <DeleteAccount />
            </>

    const Info = () =>
        loading || !databaseUser ?
            <Loader size={150} /> :
            <>
                {DynamicContent}
                {DynamicButton}
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