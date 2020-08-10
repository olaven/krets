import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02"
});//identical to hooks. TODO: should share 


//TODO: not have this as separate endpoint, but create on signup
export default async (request: NextApiRequest, response: NextApiResponse) => {

    if (request.method !== "POST") throw "wrong method. Only accepts POST";
    // Create a new customer object
    const customer = await stripe.customers.create({
        email: request.body.email,
    });

    // save the customer.id as stripeCustomerId
    // in your database.

    response.status(200).send({ customer });
}