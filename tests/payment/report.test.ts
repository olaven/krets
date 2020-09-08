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

    it("does communicate with `stripe.createUsageRecord`", async () => {

        expect(stripe.subscriptionItems.createUsageRecord)
            .toHaveBeenCalled();
    });

    it("Does call `createUsageRecord` for every user", async () => {

        const userCount = parseInt(await users.getUserCount());
        expect(stripe.subscriptionItems.createUsageRecord)
            .toHaveBeenCalledTimes(userCount);
    });
});