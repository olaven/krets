import { useEffect } from "react";
//import { getPaymentSession, createCustomer } from "../fetchers";
import { Card } from "../components/Upgrade/Card";

export default () => {

    useEffect(() => (async () => {

        console.log("Going to create Stripe Checkout Session");

    }));

    return <>


        <Card />
    </>
}

