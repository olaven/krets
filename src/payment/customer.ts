import { stripe } from "./stripe";

export const customerExists = async (customerId: string) => {

    //NOTE: resource-hungry code. Should figure out if the Stripe API provides another method. 
    try {
        await stripe.customers.retrieve(customerId)
        return true
    } catch {

        return false
    }
}

export const registerCustomer = async (email: string) => {

    const customer = await stripe.customers.create({
        email
    });

    return customer.id
}