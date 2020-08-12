import { StripeContextProvider } from "../context/StripeContext"
import { PaymentCard } from "../components/Upgrade/PaymentCard";
import { Heading } from "rebass";
import { useState } from "react";
import PaymentSection from "../components/Upgrade/PaymentSection";

const Upgrade = () => {

    const [selectedPriceId, setSelectedPriceId] = useState("price_1HDYIqIDSMRX0WhP3nTJKOGI");


    return <StripeContextProvider publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}>

        <Heading fontSize={[3, 4, 5]} textAlign="center">Oppgrader Krets!</Heading>
        <PaymentSection />
    </StripeContextProvider>
}

export default Upgrade; 