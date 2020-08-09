import { useEffect } from "react";
import { getPaymentSession } from "../fetchers";

export default () => {

    useEffect(() => (async () => {

        console.log("Going to create Stripe Checkout Session");

    }));

    const triggerCheckout = async () => {

        const { id } = await getPaymentSession();


        console.log("this is session id: ", id);
    }

    return <>
        Testing out Stripe
        <button
            onClick={triggerCheckout}
        >Trigger Checkout</button>
    </>
}

