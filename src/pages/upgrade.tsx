import { Heading, Flex, Box } from "rebass";
import { useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { ProductCard } from "../components/Upgrade/ProductCard";



const Upgrade = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("");
    const products = useProducts();

    return <>

        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>
        <Flex>
            {products.map(product => <ProductCard
                product={product}
                selectedPriceId={selectedPriceId}
                setSelectedPriceId={setSelectedPriceId} />
            )}
        </Flex>
        <Box>
            {
                selectedPriceId && <PaymentCard priceId={selectedPriceId} />
            }
        </Box>

    </>
}

export default Upgrade; 