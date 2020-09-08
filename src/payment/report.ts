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


export const reportUsage = async () =>
    (await pages.getCustomerToPageCount())
        .forEach(async ({ customer_id, count }) => {

            const subscription = await getSubscription(customer_id)
            await createUsagerecord(subscription.id, parseInt(count))
        });
