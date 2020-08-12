import { Heading } from "rebass";
import { useState } from "react";
import PaymentSection from "../components/Upgrade/PaymentSection";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";

const Upgrade = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("price_1HDYIqIDSMRX0WhP3nTJKOGI");

    const products = useProducts();
    console.log(products)

    console.log("products", products);

    return <>

        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>
        <PaymentCard priceId={"price_1HDYIqIDSMRX0WhP3nTJKOGI"} />
    </>
}

export default Upgrade; 