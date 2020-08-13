import { CREATED } from "node-kall";
import { stripe } from "../../../payment/stripe";
import { PaymentRequestModel } from "../../../models";
import { withCors, withMethods, withErrorHandling, withAuthentication } from "../../../middleware/middleware";
import { IApiRoute } from "@auth0/nextjs-auth0/dist/handlers/require-authentication";
import { users } from "../../../database/users";
import auth0 from "../../../auth/auth0";

const withMiddleware = (handler: IApiRoute) =>
    withCors(
        withErrorHandling(
            withMethods(["POST"])(
                withAuthentication(handler))))


const updateStripeDetails = async (customerId: string, paymentMethodId, priceId: string) => {
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

    const product_id = subscription.plan.product as string;
    return [product_id, subscription.id];
}

const updateDatabase = (user_id: string, subscription_id: string, product_id: string) => users.updatePaymentInformation({
    id: user_id,
    invoice_paid: true,
    subscription_id,
    product_id,
});

export default withMiddleware(async (request, response) => {

    const { user } = await auth0.getSession(request);
    const { customerId, paymentMethodId, priceId } = request.body as PaymentRequestModel

    console.log(`Going to create subscription for ${user.sub}`);
    //NOTE: error handling should ideally return 402, but is now caught by generic errorHandling-middleware
    const [product_id, subscription_id] = await updateStripeDetails(customerId, paymentMethodId, priceId);

    console.log(`Allegedly updated stripe with product ${product_id} and subscription ${subscription_id}`);
    await updateDatabase(user.sub, subscription_id, product_id);

    console.log(`Allegedly udpated database as well :D`);
    console.log(`Returning to client`);
    return response
        .status(CREATED)
        .send(`${subscription_id}`);
});