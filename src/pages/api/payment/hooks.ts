
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2020-03-02"
});

export default (request: NextApiRequest, response: NextApiResponse) => {

    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    //TODO: signing fails. Probably due to some parsing Next does on the body. Stripe expects raw body, as I understand it. Seehttps://github.com/stripe/stripe-node/issues/860
    // raw buffer ints? 
    try {
        event = stripe.webhooks.constructEvent(
            JSON.stringify(request.body),
            request.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(err);
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(
            `⚠️  Check the env file and enter the correct webhook secret.`
        );
        return response
            .status(400)
            .send("");
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    console.log(`Received event type: ${event.type}`)


    response.send("FROM /hooks");

}