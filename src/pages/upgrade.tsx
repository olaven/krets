import { Heading } from "rebass";
import { useState } from "react";
import { useProducts } from "../effects/useProducts";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { usePrices } from "../effects/usePrices";


const PriceRepresentation = ({ productId, setSelectedPrice }) => {

    const prices = usePrices(productId);
    return <>{prices.map(price => <>
        Pris: {price.id}
        <button onClick={() => { setSelectedPrice(price.id) }}>velg</button>
    </>)}</>
}


const Upgrade = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("");
    const products = useProducts();

    return <>

        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>
        {products.map(product => <>
            {product.name}
            <PriceRepresentation
                productId={product.id}
                setSelectedPrice={setSelectedPriceId}
            />
            <br />
        </>)}
        {
            selectedPriceId && <PaymentCard priceId={"price_1HDYIqIDSMRX0WhP3nTJKOGI"} />
        }
    </>
}

export default Upgrade; 