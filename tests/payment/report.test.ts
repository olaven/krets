import { reportUsage } from "../../src/payment/report";

describe("The function reporting usage", () => {

    it("Does not crash", async () => {

        expect(reportUsage())
            .resolves
            .not.toThrow();
    });

    it("")


})