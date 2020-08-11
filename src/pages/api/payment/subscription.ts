import { OK, BAD_REQUEST } from "node-kall";
import { KretsCors } from "../../../middleware/KretsCors";
import { stripe } from "../../../payment/stripe";
import { PaymentRequestModel } from "../../../models";
import auth0 from "../../../auth/auth0";

export default KretsCors(
    auth0.requireAuthentication(async (request, response) => {

        if (request.method !== "POST") {
            response
                .status(BAD_REQUEST)
                .send("");
            return;
        }

        const { customerId, paymentMethodId, priceId } = request.body as PaymentRequestModel

        try {

            await stripe.paymentMethods.attach(paymentMethodId,
                {
                    customer: customerId
                }
            );
        } catch ({ message }) {

            response //NOTE: 402 -> PAYMENT_REQUIRED
                .status(402)
                .send(message);
        }


        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        });

        const subscription = stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent']
        });

        response
            .status(OK)
            .send(subscription);
    })
);