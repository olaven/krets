/**
 * @jest-environment jsdom
 */

import React from "react";
import { AdminPage } from "../../../src/components/Admin/AdminPage"
import { TextList } from "../../../src/components/Admin/TextList/TextList";
import { waitFor, render } from "@testing-library/react"
import { Emotion, ResponseModel } from "../../../src/models/models";
import * as text from "../../../src/text"
import '@testing-library/jest-dom/extend-expect'
import * as faker from "faker";
import { mockRouter } from "../frontendTestUtils";
import { AdminPageContext } from "../../../src/context/AdminPageContext";
import { UserContext } from "../../../src/context/UserContext";
import { emotionToNumeric } from "../../../src/components/Admin/Charts/ChartUtils";

const randomEmotion = () => {

    const emotions: Emotion[] = [":-)", ":-|", ":-("];
    return emotions[faker.random.number({ min: 0, max: 2 })];
}

const fakeResponses = (amount: number): ResponseModel[] => new Array(amount).fill(0)
    .map(() => ({
        id: faker.random.uuid(),
        emotion: randomEmotion(),
        text: faker.random.alphaNumeric(10),
        page_id: faker.random.uuid(),
        created_at: faker.date.past(2).toString(),
    }))

describe("Admin page", () => {

    it("Displays loader before content is available", () => {

        const { getByLabelText } = render(<AdminPage />);
        expect(getByLabelText("loader-label")).toBeInTheDocument();
    });

    it("Shows message if you are not the owner", () => {


        const userID = "A";
        const ownerId = "B";

        const userContext = {
            authUser: {
                email: "mail@example.com",
                name: "username",
                sub: userID
            },
            databaseUser: null,
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
        });

        // As per issue #168
        it("Renders sad responses", async () => {

            //NOTE: sad emotion
            const emotion: Emotion = ":-(";
            const text = "Text of sad emotion";

            const responses = [{
                emotion,
                text,
                id: faker.random.uuid(),
                page_id: faker.random.uuid(),
                created_at: faker.date.past(2).toString(),
            }]

            mockRouter("some-id");
            const rendered = render(
                <AdminPageContext.Provider value={{ responses, responsesLoading: false, page: null, pageLoading: false }}>
                    <TextList />
                </AdminPageContext.Provider>
            );

            expect(rendered.getByText(text)).toBeInTheDocument();
        });
    });
});  