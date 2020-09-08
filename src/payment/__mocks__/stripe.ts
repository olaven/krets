import * as faker from "faker";
import Stripe from "stripe";


const customers: string[] = [];
export const stripe = {
    customers: {
        create: (user: {
            email: string
        }) => {

            const id = faker.random.uuid();
            customers.push(id);
            return {
                id
            }
        },
        retrieve: (id: string) => {

            if (customers.includes(id))
                return customers[customers.indexOf(id)];
            throw "Customer does not exist"
        },
        del: async (id: string) => {
            return "MOCK DELETED";
        }
    },
    subscriptionItems: ({
        createUsageRecord: jest.fn((productId: string, UsageRecord: Stripe.UsageRecordCreateParams) => {

            console.log("Insie createUsageRecord MOCK");
        }),
    })
}