import { UserModel } from "../models/models";
import { stripe } from "./stripe"

export const createSubscription = async (customerId: string, paymentMethodId, priceId: string) => {
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

export const cancelSubscription = (user: UserModel) =>
    stripe.subscriptions.del(user.subscription_id);

export const retrieveSubscription = (user: UserModel) =>
    stripe.subscriptions.retrieve(user.subscription_id); 
