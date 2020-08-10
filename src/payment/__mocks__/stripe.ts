import * as faker from "faker";

export const stripe = {
    customers: {
        create: (user: {
            email: string
        }) => {

            return {
                id: faker.random.uuid()
            }
        }
    }
}