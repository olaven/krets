import { stripe } from "./stripe";

export const getProducts = async () =>
    (await stripe.products.list()).data;


export const getProductBySubscription = async (subscriptionId: string) => {

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const productId = subscription.plan.product as string;
    return stripe.products.retrieve(productId);
}