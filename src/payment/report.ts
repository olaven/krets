import { stripe } from "./stripe"
import { pages } from "../database/database"
import { getSubscription } from "./subscription"


const createUsagerecord = (productId: string, count: number) => stripe.subscriptionItems.createUsageRecord(
    productId,
    {
        quantity: count,
        timestamp: Date.now(),
        action: "set"
    }
)


export const reportUsage = async () => {

    //NOTE: jest does not appear to play nice with async for loops 
    const customersToPageCount = await pages.getCustomerToPageCount(); 
    for (const { customer_id, count } of customersToPageCount) {

        const subscription = await getSubscription(customer_id); 
        await createUsagerecord(subscription.id, parseInt(count))
    }
}