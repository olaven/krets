import { CREATED, BAD_REQUEST } from "node-kall";
import { stripe } from "../../../payment/stripe";
import { PaymentRequestModel } from "../../../models";
import { withAuthentication } from "../../../middleware/withAuthentication";
import { withCors } from "../../../middleware/withCors";
import { withMethods } from "../../../middleware/withMethods";
import { withErrorHandling } from "../../../middleware/withErrorHandling";
import { IApiRoute } from "@auth0/nextjs-auth0/dist/handlers/require-authentication";

const withMiddleware = (handler: IApiRoute) =>
    withCors(
        withErrorHandling(
            withMethods(["POST"])(
                withAuthentication(handler))))

//TODO: 
// STORE subscription.items[0].price.id // or sothing like it 
// STORE subscription.id // or sothing like it 
export default withMiddleware(async (request, response) => {

    const { customerId, paymentMethodId, priceId } = request.body as PaymentRequestModel

    //NOTE: error handling should ideally return 402, but is now caught by generic errorHandling-middleware
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, {
        invoice_settings: {
            default_payment_method: paymentMethodId
        }
    });

    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent']
    });

    response
        .status(CREATED)
        .send(subscription);
});