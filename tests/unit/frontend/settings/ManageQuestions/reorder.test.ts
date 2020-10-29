import { reorder } from "../../../../../src/components/Settings/ManageQuestions/reorder";

describe("Helper function for reordering questions", () => {

    it("Can move element right", async () => {

        expect(
            reorder("right")(
                "b",
                ["a", "b", "c"]
            )
        ).toEqual(
            ["a", "c", "b"]
        )
    });

    it("Can move element left", async () => {

        expect(
            reorder("left")(
                2,
                [1, 2, 3]
            )
        ).toEqual(
            [2, 1, 3]
        );
    });

    it("Does not move right if element is last", () => {

        expect(
            reorder("right")(
                2,
                [1, 2]
            )
        ).toEqual(
            [1, 2]
        );
    });

    it("Does not move left if element is first", () => {

        expect(
            reorder("left")(
                1,
                [1, 2]
            )
        ).toEqual(
            [1, 2]
        )
    });
});