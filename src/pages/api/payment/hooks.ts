import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
//import Cors from 'micro-cors'
import { NO_CONTENT, NOT_IMPLEMENTED, BAD_REQUEST } from "node-kall"
import { stripe } from "../../../payment/stripe";
import { withCors } from "../../../middleware/withCors";
import Stripe from "stripe";
import { useResponses } from "../../../effects/useResponses";
import { users } from "../../../database/users";


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

export default withCors(
    async (request: NextApiRequest, response: NextApiResponse) => {

        const event = await getHookEvent(request);
        if (!event) return response
            .status(BAD_REQUEST)
            .send(null);


        const handler = {
            "invoice.paid": handleInvoicePaid,
            "invoice.payment_succeeded": handleInvoicePaid,
            "invoice.payment_failed": handleInvoiceFailed
        }[event.type];

        if (handler) handler(event, request, response);
        else response
            .status(NOT_IMPLEMENTED)
            .send(null);
    }
);

const getCustomerId = (event: Stripe.Event) =>
    (event.data.object as any).customer as string

const setActiveSubscription = async (active: boolean) => {

    const customerId = getCustomerId(event);
    //THINKABOUT: having just : UserModel instaed of updatePaymentInformation would make this a lot cleaner 
    const user = await users.getUserByCustomerId(customerId)
    await users.updatePaymentInformation(user.id, user.product_id, user.subscription_id, active);
}

const handleInvoicePaid = async (event: Stripe.Event, request: NextApiRequest, response: NextApiResponse) => {

    setActiveSubscription(true)

    response
        .status(NO_CONTENT)
        .send(null)
}

const handleInvoiceFailed = async (event: Stripe.Event, request: NextApiRequest, response: NextApiResponse) => {

    setActiveSubscription(false);

    response
        .status(NO_CONTENT)
        .send(null);
}