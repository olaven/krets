import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = new Stripe("API KEY", {
  apiVersion: '2020-03-02',
});

const endpointSecret = "SOME_ENDPOINT_SECRET_FROM_DASHBOARD";

/**
    To be called by Stripe on succesful payment
 */
export default function (request: NextApiRequest, response: NextApiResponse) {

  const signature = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    //TODO: UPDATE DATABASE WITH PURCHAES
    console.log("session when completed checkout", session);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
}