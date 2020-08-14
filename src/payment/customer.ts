import { stripe } from "./stripe";

export const getCustomer = async (customerId: string) => {

    const customer = await stripe.customers.retrieve(customerId)
    return customer;
}

export const registerCustomer = async (email: string) => {

    const customer = await stripe.customers.create({
        email
    });

    return customer.id
}