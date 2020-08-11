import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { Heading } from "rebass";
import { useState } from "react";

export default () => {

    const [selectedPriceId, setSelectedPriceId] = useState("price_1HDYIqIDSMRX0WhP3nTJKOGI")

    return <>
        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>

        <PaymentCard priceId={selectedPriceId} />
        {/* <PaymentCard priceId={"price_1HDYN5IDSMRX0WhPU0HbyKfg"} /> */}
    </>
}

