/**
 * @jest-environment jsdom
 */

import React from "react";
import { Charts } from "../../../../src/components/Charts"
import { render, waitFor, fireEvent } from "@testing-library/react"
import * as text from "../../../../src/helpers/text"
import '@testing-library/jest-dom/extend-expect'
import { AdminPageContext } from "../../../../src/context/AdminPageContext";
import { UserContext } from "../../../../src/context/UserContext";
import { CompareContext } from "../../../../src/context/CompareContext";
import { mockFetch } from "../frontendTestUtils";
import { AuthModel, UserModel } from "../../../../src/models/models";


const launch = () => {
    const userID = "A";
    const ownerId = "B";

    const userContext = {
        authUser: {
            name: "username",
            sub: userID
        } as AuthModel,
        databaseUser: {} as UserModel,
        loading: false,
        updateUser: () => { }
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
        getNextResponses: async () => { }
    }

    const compareContext = {
        setSelected: () => { },
        pageInformations: [
            //NOTE: no information 
            //TODO: populate if needed
        ]
    }

    return render(<UserContext.Provider value={userContext}>
        <AdminPageContext.Provider value={adminContext}>
            <CompareContext.Provider
                value={compareContext}
            >
                <Charts />
            </CompareContext.Provider>
        </AdminPageContext.Provider>
    </UserContext.Provider>)
}

describe("The charts component", () => {

    describe("The collapsible wrappers", () => {

        mockFetch(["mock payload"], 200);

        describe("Collapsible for line chart", () => {

            it("Shows collapsible for line chart", () => {

                const { getByText } = launch();
                expect(getByText(text.charts.lineChartCollapsible)).toBeInTheDocument();
            });

            it("Does not show graph by default", () => {

                const { getByLabelText } = launch();
                expect(getByLabelText("line-chart-label")).not.toBeVisible();
            });

            it("Does show if collapsible button is clicked", () => {

                const { getByText, getByLabelText } = launch();
                const element = getByText(text.charts.lineChartCollapsible)
                fireEvent.click(element)

                waitFor(() => {
                    expect(getByLabelText("line-chart-label")).toBeVisible();
                });
            });
        });

        describe("Collapsible for bar chart", () => {

            it("Shows collapsible for bar chart", () => {

                const { getByText } = launch();
                expect(getByText(text.charts.barChartCollapsible)).toBeInTheDocument();
            });

            it("Does not show graph by default", () => {

                const { getByLabelText } = launch();
                expect(getByLabelText("bar-chart-label")).not.toBeVisible();
            });

            it("Does show if collapsible button is clicked", () => {

                const { getByText, getByLabelText } = launch();
                const element = getByText(text.charts.barChartCollapsible)
                fireEvent.click(element)

                waitFor(() => {
                    expect(getByLabelText("bar-chart-label")).toBeVisible();
                });
            });
        });
    })
});  