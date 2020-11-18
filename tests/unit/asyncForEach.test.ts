import * as faker from "faker"
import { asyncForEach } from "../../src/helpers/asyncForEach";

describe("Helper function `asyncForEach", () => {

    it("Does not crash", () => {

        expect(
            asyncForEach([], async (e) => {

            })
        ).resolves.not.toThrow();
    });

    it("does does not continue execution before all elements have been called", async () => {

        const count = faker.random.number();
        const callback = jest.fn(async (element) => { });

        await asyncForEach(new Array(count), callback);

        expect(callback).toHaveBeenCalledTimes(count);
    });

    it("does call in index-order", async () => {

        const input = [1, 2, 3];
        const detected = [];
        const callback = jest.fn(async (element) => {
            detected.push(element);
        });

        await asyncForEach(input, callback);

        expect(detected).toEqual(input);
    })
})