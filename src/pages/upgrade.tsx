import { useEffect } from "react";
import { getPaymentSession, createCustomer } from "../fetchers";
import { Card } from "../components/Upgrade/Card";

export default () => {

    useEffect(() => (async () => {

        console.log("Going to create Stripe Checkout Session");

    }));

    const triggerCheckout = async () => {

        const { id } = await getPaymentSession();


        console.log("this is session id: ", id);
    }

    const createCustomerClick = async () => {

        const [status, customer, response] = await createCustomer("olav@sundfoer.com");
        console.log(status, customer, response);
    }

    return <>
        Testing out Stripe
        <button
            onClick={triggerCheckout}
        >Trigger Checkout</button>
        <button
            onClick={createCustomerClick}
        >Create Custome</button>

        <Card />
    </>
}

