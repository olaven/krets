/**
 * @jest-environment jsdom
 */

import React from "react";
import { AdminPage } from "../../../src/components/Admin/AdminPage"
import { TextList } from "../../../src/components/Admin/TextList/TextList";
import { waitFor, render } from "@testing-library/react"
import { ResponseModel } from "../../../src/models";
import * as text from "../../../src/text"
import '@testing-library/jest-dom/extend-expect'
import * as faker from "faker";
import { mockRouter } from "../frontendTestUtils";
import { AdminPageContext } from "../../../src/context/AdminPageContext";
import { UserContext } from "../../../src/context/UserContext";
import { emotionToNumeric } from "../../../src/components/Admin/Charts/ChartUtils";

const fakeResponses = (amount: number): ResponseModel[] => new Array(amount).fill(0)
    .map(() => ({
        id: faker.random.uuid(),
        emotion: ":-)", //TODO: make random
        text: faker.random.alphaNumeric(10),
        page_id: faker.random.uuid(),
        created_at: faker.date.past(2).toString(),
    }))

describe("Admin page", () => {

    it("Displays message about loading", () => {

        const { getByText } = render(<AdminPage />);
        expect(getByText(text.adminPage.loading)).toBeInTheDocument();
    });

    it("Shows message if you are not the owner", () => {


        const userID = "A";
        const ownerId = "B";

        const userContext = {
            user: {
                name: "username",
                sub: userID
            },
            updateUser: () => { }
        }

        const adminContext = {
            page: {
                id: "test id",
                name: "test page",
                owner_id: ownerId
            },
            pageLoading: false,
            responses: [],
            responsesLoading: false,
        }
        const { getByText } = render(<UserContext.Provider value={userContext}>
            <AdminPageContext.Provider value={adminContext}>
                <AdminPage />
            </AdminPageContext.Provider>
        </UserContext.Provider>)

        expect(getByText(text.adminPage.notOwning)).toBeInTheDocument();
    })
});

describe("Conversion between emotins and numeric values", () => {

    describe("The function converting Emotion to numeric value", () => {

        it("values happy face over neutral face", () => {

            const happy = emotionToNumeric(":-)");
            const neutral = emotionToNumeric(":-|");

            expect(happy).toBeGreaterThan(neutral);
        })

        it("values neutral face over sad face", () => {

            const netural = emotionToNumeric(":-|");
            const sad = emotionToNumeric(":-(");

            expect(netural).toBeGreaterThan(sad);
        });

        it("The given scores have the same interval", () => {

            const happy = emotionToNumeric(":-)");
            const neutral = emotionToNumeric(":-|");
            const sad = emotionToNumeric(":-(");

            expect(happy - neutral).toEqual(neutral - sad);
        });
    });

    describe("The list of text responses", () => {

        it("renders every response with text", async () => {

            const responses = fakeResponses(10);

            mockRouter("some-id");
            const rendered = render(
                <AdminPageContext.Provider value={{ responses, responsesLoading: false, page: null, pageLoading: false }}>
                    <TextList />
                </AdminPageContext.Provider>
            );

            for (const response of responses) {

                expect(rendered.getByText(response.text)).toBeInTheDocument();
            }
        })
    });
});  