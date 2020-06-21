/**
 * @jest-environment jsdom
 */

import React from "react";
import { AdminPage } from "../../src/components/Admin/AdminPage"
import { averageUntil, emotionToNumeric } from "../../src/components/Admin/MoodGraph"
import { render } from "@testing-library/react"
import { ReseponseModel } from "../../src/models";
import * as text from "../../src/text"
import '@testing-library/jest-dom/extend-expect'
import * as faker from "faker";

const fakeResponses = (amount: number): ReseponseModel[] => new Array(amount).fill(0)
    .map(() => ({
        id: faker.random.uuid(),
        emotion: ":-)", //TODO: make random
        text: faker.lorem.lines(3),
        page_id: faker.random.uuid(),
        created_at: faker.date.past().getTime().toString(),
    }))

describe("Admin page", () => {

    it("Displays message about loading", () => {

        const { getByText } = render(<AdminPage />);
        expect(getByText(text.adminPage.loading)).toBeInTheDocument();
    });
});

describe("Mood graph", () => {

    describe("Calculation of coordinates", () => {

        it("Returns Y coordinate with average", () => {

            const n = faker.random.number(10);

            const responses = fakeResponses(n);
            const sum = (responses
                .map(({ emotion }) => emotion)
                .map(emotionToNumeric)
                .reduce((a, b) => a + b))

            console.log("RESP", responses, "SUM: ", sum, "Length: ", responses.length);
            const result = averageUntil(responses[responses.length - 1], responses);

            expect(result.y).toEqual(sum / responses.length);
        })
    });
}); 