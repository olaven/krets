import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
//import Cors from 'micro-cors'
import { NOT_IMPLEMENTED, BAD_REQUEST } from "node-kall"
import { stripe } from "../../../payment/stripe";
import { withCors } from "../../../middleware/withCors";


// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false,
    },
}

const getHookEvent = async (request: NextApiRequest) => {

    try {
        const event = stripe.webhooks.constructEvent(
            (await buffer(request)).toString(),
            //JSON.stringify(request.body, null, 2),
            request.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );

        return event
    } catch (err) {

        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(`⚠️  Check the env file and enter the correct webhook secret.`);

        return null
    }
}

export default withCors(async (request: NextApiRequest, response: NextApiResponse) => {

    const event = await getHookEvent(request);
    if (!event) return response
        .status(BAD_REQUEST)
        .send(null);


    const eventData = event.data.object;

    if (event.type === "invoice.paid") {
        handleInvoicePaid(eventData, request, response);
    } else if (event.type === "invoice.payment_failed") {
        handleInvoiceFailed(eventData, request, response);
    } else {

        response
            .status(NOT_IMPLEMENTED)
            .send(null);
    }
});



const handleInvoicePaid = (eventData: any, request: NextApiRequest, response: NextApiResponse) => {


    throw "handleInvoicePaid not implemented";
}

const handleInvoiceFailed = (eventData: any, request: NextApiRequest, response: NextApiResponse) => {

    throw "handleInvoiceFailed not implemented";
}