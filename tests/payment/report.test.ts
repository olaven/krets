import { users } from "../../src/database/database";
import { reportUsage } from "../../src/payment/report";
import { stripe } from "../../src/payment/stripe"

jest.mock("../../src/payment/stripe");

describe("The function reporting usage", () => {

    it("Does not crash", async () => {

        expect(reportUsage())
            .resolves
            .not.toThrow();
    });

    it("does communicate with `stripe.createUsageRecord` ", async () => {

        await reportUsage(); 
        expect(stripe.subscriptionItems.createUsageRecord)
            .toHaveBeenCalled();
    });

    //FIXME: denne tar for lang tid fordi det er shit ton med brukere i testdatabasen. Finn ut av hvordan jeg kan cleare før/etter hver test 
    it("Does call `createUsageRecord` for every user ", async () => {

        const userCount = await users.getUserCountWithSubscription(); 
        //@ts-expect-error
        stripe.subscriptionItems.createUsageRecord.mockReset()
        await reportUsage(); 
        expect(stripe.subscriptionItems.createUsageRecord)
            .toHaveBeenCalledTimes(userCount);
    });
});