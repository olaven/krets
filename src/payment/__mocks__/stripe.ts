import * as faker from "faker";


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

            customers.includes(id);
        }
    }
}