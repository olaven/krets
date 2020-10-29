/**
 * @jest-environment jsdom
 */

import React from "react";
import { AdminPage } from "../../../../src/components/Admin/AdminPage"
import { TextList } from "../../../../src/components/Admin/TextList/TextList";
import { waitFor, render } from "@testing-library/react"
import { AnswerModel, Emotion, ResponseModel } from "../../../../src/models/models";
import * as text from "../../../../src/text"
import '@testing-library/jest-dom/extend-expect'
import * as faker from "faker";
import { mockFetch, mockRouter } from "../frontendTestUtils";
import { AdminPageContext } from "../../../../src/context/AdminPageContext";
import { UserContext } from "../../../../src/context/UserContext";
import { emotionToNumeric } from "../../../../src/components/Admin/Charts/ChartUtils";
import { randomAnswer, randomResponse } from "../../database/databaseTestUtils";
import { randomPage } from "../../api/apiTestUtils";
import responses from "../../../../src/pages/api/pages/[id]/responses";
import { TextCard } from "../../../../src/components/Admin/TextList/TextCard";

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
            updateUser: () => { },
            loading: false
        }

        const adminContext = {
            page: {
                id: "test id",
                name: "test page",
                owner_id: ownerId,
                mandatory_contact_details: false,
            },
            pageLoading: false,
            responses: [],
            responsesLoading: false,
            moreResponsesAvailable: true,
            getNextResponses: () => { },
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

    //FIXME: these test _always_ pass..
    describe("The list of text responses", () => {

        it("renders every response with text", async () => {

            const responses = fakeResponses(10);
            const fakeAnswer = randomAnswer("RESPONSE-ID-DOES-NOT-MATTER-TO-TEST");
            mockFetch(fakeAnswer, 200);

            mockRouter("some-id");
            const rendered = render(
                <AdminPageContext.Provider value={{ responses, moreResponsesAvailable: false, responsesLoading: false, page: randomPage("OWNER-NOT-REELVANT"), pageLoading: false, getNextResponses: () => { }, }}>
                    <TextList />
                </AdminPageContext.Provider>
            );

            for (const response of responses) {

                waitFor(() => {

                    expect(rendered.getByText(fakeAnswer.text)).toBeInTheDocument();
                });
            }
        });

        // As per issue #168
        it("Renders sad responses", async () => {

            //NOTE: sad emotion
            const emotion: Emotion = ":-(";
            const answer: AnswerModel = {
                text: "Text of sad emotion",
                response_id: "NOT-RELEVANT"
            }

            const responses: ResponseModel[] = [{
                emotion,
                id: faker.random.uuid(),
                page_id: faker.random.uuid(),
                created_at: faker.date.past(2).toString(),
            }]

            mockRouter("some-id");
            const rendered = render(
                <AdminPageContext.Provider value={{ responses, moreResponsesAvailable: false, responsesLoading: false, page: randomPage("OWNER-NOT-RELEVANT"), pageLoading: false, getNextResponses: () => { }, }}>
                    <TextList />
                </AdminPageContext.Provider>
            );

            waitFor(() => {
                expect(rendered.getByText(answer.text)).toBeInTheDocument();
            });
        });
    });

    describe("The text card component", () => {

        const launch = (response: ResponseModel, answers: AnswerModel[]) => {

            mockFetch(answers, 200);
            return render(
                <AdminPageContext.Provider value={{
                    responses: [response],
                    moreResponsesAvailable: false,
                    responsesLoading: false,
                    page: randomPage("not-relevant"),
                    pageLoading: false,
                    getNextResponses: () => { }
                }} >
                    <TextCard response={response}></TextCard>
                </AdminPageContext.Provider >
            )
        }

        it("Does not crash on render", () => {

            expect(() => {
                launch(randomResponse("page-id"), []);
            }).not.toThrow();
        });

        it("Does render the answer text", () => {

            const answers = [randomAnswer(""), randomAnswer("")];
            const { getByText } = launch(randomResponse("not-relevant"), answers);

            waitFor(() => {

                expect(getByText(answers[0].text)).toBeInTheDocument();
            });
        });

        it("Does render contact deatils when answers are present", () => {

            const response: ResponseModel = {
                ...randomResponse("page-id"),
                contact_details: faker.internet.email()
            };

            const answers = [randomAnswer(""), randomAnswer("")];
            const { getByText } = launch(response, answers);

            waitFor(() => {

                expect(getByText(response.contact_details)).toBeInTheDocument();
            });
        });

        it("Does render contact deatils when __no__ answers are present", () => {

            const response: ResponseModel = {
                ...randomResponse("page-id"),
                contact_details: faker.internet.email()
            };

            //NOTE: no answers
            const { getByText } = launch(response, []);

            waitFor(() => {

                expect(getByText(response.contact_details)).toBeInTheDocument();
            });
        });
    });
});  