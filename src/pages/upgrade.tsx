import { Heading, Text, Flex, Box } from "rebass";
import { useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";
import * as text from "../text"



const Upgrade = () => {

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

export default Upgrade; 