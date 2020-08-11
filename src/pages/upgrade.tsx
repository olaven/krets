import { useEffect } from "react";
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { Heading } from "rebass";

export default () => {


    return <>
        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>

        <PaymentCard priceId={"price_1HDYIqIDSMRX0WhP3nTJKOGI"} />
        {/* <PaymentCard priceId={"price_1HDYN5IDSMRX0WhPU0HbyKfg"} /> */}
    </>
}

