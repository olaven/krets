import * as faker from "faker";

export const stripe = {
    customers: {
        create: (user: {
            email: string
        }) => {
            console.log("STRIPE MOCK");
            return {
                id: faker.random.uuid()
            }
        }
    }
}