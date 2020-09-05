import { useRouter } from "next/router";
import { Heading, Text, Flex, Box, Button, Link } from "rebass";
import { useContext, useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";
import * as text from "../text"
import { UserContext } from "../context/UserContext";

const PriceAlternatives = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("");
    const products = useProducts();

    return <>
        <Heading fontSize={[3, 4, 5]} textAlign="center">{text.upgrade.heading}</Heading>
        <Text
            py={[1, 2]}
            fontSize={[1, 2, 3]}
            textAlign="center">
            {text.upgrade.trailInformation}
        </Text>
        <Flex p={[2, 3, 4]}>
            <Box width={[0, 1 / 5]}></Box>
            {products.map(product => <ProductCard
                product={product}
                selectedPriceId={selectedPriceId}
                setSelectedPriceId={setSelectedPriceId} />
            )}
            <Box width={[0, 1 / 5]}></Box>
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



const Upgrade = () => {

    const router = useRouter();
    const { databaseUser } = useContext(UserContext);

    if (databaseUser?.subscription_id)
        router.replace("/user");

    return <PriceAlternatives />
}

export default Upgrade; 