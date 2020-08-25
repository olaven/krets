import { Heading, Text, Flex, Box, Button } from "rebass";
import { useContext, useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";
import * as text from "../text"
import { UserContext } from "../context/UserContext";
import { database } from "faker";

const PriceAlternatives = () => {

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

const Downgrade = () => {

    const { databaseUser, authUser } = useContext(UserContext);

    const onCancel = async () => {


    }

    return <Box>
        <Heading>Thank you, {authUser.name}</Heading>
        Du har _dette_ abbonnemenetet
        HVORFOR KRETS ER FINT OG HVORFOR DET ER SAA FLOTT AT DE BRUKER DET
        MORSOM GIF?

        Kanseller-knapp


        <Button onClick={onCancel} backgroundColor="failure">
            Kanseller
        </Button>
    </Box>
}

const Upgrade = () => {

    const { databaseUser } = useContext(UserContext);

    const isSubscriber = databaseUser?.free_premium || databaseUser?.subscription_id
    return isSubscriber ?
        <Downgrade /> :
        <PriceAlternatives />
}

export default Upgrade; 