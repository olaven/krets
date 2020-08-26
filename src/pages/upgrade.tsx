import Stripe from "stripe";
import * as NextLink from 'next/link'
import { OK } from "node-kall";
import { Heading, Text, Flex, Box, Button, Link } from "rebass";
import { useContext, useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";
import * as text from "../text"
import { UserContext } from "../context/UserContext";
import { deleteSubscription } from '../fetchers';
import Loader from 'react-spinners/BounceLoader';
import { asyncEffect } from '../effects/asyncEffect';
import { useProduct } from "../effects/useProduct";

const PriceAlternatives = () => {

    const { updateUser } = useContext(UserContext);

    const [selectedPriceId, setSelectedPriceId] = useState("");
    const products = useProducts();

    return <>
        <Heading fontSize={[3, 4, 5]} textAlign="center">{text.upgrade.heading}</Heading>
        <Text fontSize={[1, 2, 3]} textAlign="center">{text.upgrade.inDevelopmentWarning}</Text>
        <Flex p={[2, 3, 4]}>
            {products.map(product => <ProductCard
                product={product}
                selectedPriceId={selectedPriceId}
                setSelectedPriceId={setSelectedPriceId} />
            )}
        </Flex>
        <Flex width={1} m={[2, 3, 4]}>
            <Box width={[0, 1 / 3]} />
            <Box width={1}>
                {selectedPriceId &&
                    <PaymentCard priceId={selectedPriceId} />}
            </Box>
            <Box width={[0, 1 / 3]} />
        </Flex>
    </>
}

const CancelSubscription = () => {

    const { updateUser } = useContext(UserContext);
    const [triggered, setTriggered] = useState(false);
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
            {text.upgrade.cancellationError} <Link href={"mailto:post@krets.app"}>{text.upgrade.cancelContact}</Link>{text.upgrade.cancelSuffix}
        </Text>
    }

    return triggered ?
        <Flex>
            <Button width={[1 / 2, 1 / 4]} onClick={() => { setTriggered(false) }} backgroundColor="primary" m={[1]}>
                <Text>{text.upgrade.notSure}</Text>
            </Button>
            <Button width={[1 / 2, 1 / 4]} onClick={onCancel} backgroundColor="failure" m={[1]}>
                <Text>{text.upgrade.sure}</Text>
            </Button>
        </Flex > :
        <Button width={[1, 0.5]} onClick={() => { setTriggered(true) }} backgroundColor="failure" m={[1]} >
            <Text>{text.upgrade.cancel}</Text>
        </Button >


}

const SubscriptionInfo = () => {

    const { authUser } = useContext(UserContext);
    const product = useProduct(authUser.sub);

    const TextBox = ({ children }) => <Text fontSize={[2, 3, 4]} my={[1, 2, 3]}>
        {children}
    </Text>

    return <Flex>
        <Box width={[0, 1 / 3]} />
        <Box>
            <Heading as="h1">{text.upgrade.thanks.heading} {authUser.name.split(" ")[0]} 🙌</Heading>
            <TextBox>{text.upgrade.thanks.subscription} <span style={{
                borderColor: "teal",
                borderStyle: "solid",
                padding: "5px"
            }}>{product?.name}</span> </TextBox>
            <TextBox>
                {text.upgrade.thanks.aboutFeedback}
            </TextBox>
            <TextBox>
                {text.upgrade.thanks.aboutKrets}
            </TextBox>
            <TextBox>
                {text.upgrade.thanks.contactPrefix} <Link href={"mailto:post@krets.app"}>post@krets.app</Link>{text.upgrade.thanks.contactSuffix}
            </TextBox>
            <TextBox>
                - <Link href="https://olaven.org">Olav</Link> {text.upgrade.thanks.greetings}
            </TextBox>

            <Button width={[1, 0.5]} backgroundColor="primary" m={[1]}>
                <NextLink.default href={"/"} prefetch={true}>
                    <a style={{ textDecoration: "none" }}>
                        <Text color="secondary">{text.upgrade.back}</Text>
                    </a>
                </NextLink.default>
            </Button>
            <CancelSubscription />
        </Box>
        <Box width={[0, 1 / 3]} />
    </Flex >
}

const Upgrade = () => {

    const { databaseUser } = useContext(UserContext);

    const isSubscriber = databaseUser?.free_premium || databaseUser?.subscription_id
    return isSubscriber ?
        <SubscriptionInfo /> :
        <PriceAlternatives />
}

export default Upgrade; 