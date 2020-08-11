import { OK, NOT_IMPLEMENTED } from "node-kall"
import { stripe } from "../../../payment/stripe";
import { KretsCors } from "../../../middleware/KretsCors";
import { withAuthentication } from "../../../middleware/withAuthentication";

/**
 * NOTE: It may be that this route should not require authentication. 
 * NOT sure.
 */
export default KretsCors(
    withAuthentication(async (request, response) => {

        if (request.method !== "GET") {
            response
                .status(NOT_IMPLEMENTED)
                .send("");
            return;
        }

        const { id } = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: "price_1HDYIqIDSMRX0WhP3nTJKOGI", //TODO: keep secret
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'https://krets.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://krets.app/upgrade',
        });

        response
            .status(OK)
            .send({ id });
    })
);