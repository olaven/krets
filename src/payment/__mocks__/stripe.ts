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

            if (customers.includes(id))
                return customers[customers.indexOf(id)];
            throw "Customer does not exist"
        }
    }
}