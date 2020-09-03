import Stripe from "stripe";
import { UserModel } from "../models/models";
import { stripe } from "./stripe"

export const createSubscription = async (customerId: string, paymentMethodId, priceId: string) => {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, {
        invoice_settings: {
            default_payment_method: paymentMethodId
        },
    });

    //NOTE: assumes only one tax rate present in backend 
    const [taxRate] = (await stripe.taxRates.list()).data.
        filter(rate => rate.active); //should remove archived rates 

    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
        default_tax_rates: [
            taxRate.id
        ]
    });

    const product_id = subscription.plan.product as string;
    return [product_id, subscription.id];
}

export const getSubscription = async (customerId: string): Promise<Stripe.Subscription | null> => {

    const subscriptions = await stripe.subscriptions.list({ customer: customerId })
    //NOTE: assumes that only one subscription is returned 
    const [subscription] = subscriptions.data;

    return subscription ?
        subscription :
        null
}

export const cancelSubscription = (user: UserModel) =>
    stripe.subscriptions.del(user.subscription_id);