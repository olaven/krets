import { stripe } from "./stripe";

export const registerCustomer = async (email: string) => {

    const customer = await stripe.customers.create({
        email
    });

    return customer.id
}