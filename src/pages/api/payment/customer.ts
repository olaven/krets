import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../payment/stripe";
import { KretsCors } from "../../../middleware/KretsCors";

//FIXME: below is implemented, this file should be removed
//TODO: not have this as separate endpoint, but create on signup
export default KretsCors(
    async (request: NextApiRequest, response: NextApiResponse) => {

        if (request.method !== "POST") throw "wrong method. Only accepts POST";

        // Create a new customer object
        const customer = await stripe.customers.create({
            email: request.body.email,
        });

        // save the customer.id as stripeCustomerId
        // in your database.

        response.status(200).send({ customer });
    }
) 