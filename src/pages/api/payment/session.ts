import * as s from "stripe";
import { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";
const stripe = new Stripe("API KEY", {
    apiVersion: '2020-03-02',
});

export default async function (request: NextApiRequest, response: NextApiResponse) {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: '{{PRICE_ID}}',
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',
    });

    response.json(session)
}