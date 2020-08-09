import Stripe from "stripe";
import { useEffect } from "react";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2020-03-02"
});//identical to hooks. TODO: should share 

export default () => {

    useEffect(() => (async () => {

        console.log("Going to create Stripe Checkout Session");

    }));

    const triggerCheckout = async () => {

        console.log("Creating session")
        const session = await stripe.checkout.sessions.create({ //FIXME: Should create session on server side and pass to client 
            payment_method_types: ['card'],
            line_items: [{
                price: "PRICE_ID", //TODO: keep secret
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'https://krets.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://krets.app/upgrade',
        });

        console.log("this is sessioN: ", session);
    }

    return <>
        Testing out Stripe
        <button
            onClick={triggerCheckout}
        >Trigger Checkout</button>
    </>
}

