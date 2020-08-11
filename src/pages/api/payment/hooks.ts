import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
//import Cors from 'micro-cors'
import { stripe } from "../../../payment/stripe";
import { withCors } from "../../../middleware/withCors";

//TODO: remove this after asserting that webhooks work with KretsCors
/* const cors = Cors({
    allowMethods: ['POST', 'HEAD']
});
 */
// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false,
    },
}

export default withCors(async (request: NextApiRequest, response: NextApiResponse) => {

    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const buff = await buffer(request);


    try {
        event = stripe.webhooks.constructEvent(
            buff.toString(),
            //JSON.stringify(request.body, null, 2),
            request.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        //console.log(err);
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

}); 