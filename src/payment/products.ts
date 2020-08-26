import { stripe } from "./stripe";

export const getProducts = async () =>
    (await stripe.products.list()).data;

export const getProduct = (id: string) =>
    stripe.products.retrieve(id); 