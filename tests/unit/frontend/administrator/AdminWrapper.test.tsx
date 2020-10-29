/**
 * @jest-environment jsdom
 */

import React from "react";
import { waitFor } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import * as faker from "faker";
import { renderWithUserContext } from "../frontendTestUtils";
import { randomUser } from "../../database/databaseTestUtils";
import { UserRole } from "../../../../src/models/UserModel";
import { AdminWrapper } from "../../../../src/components/AdminWrapper";

describe("The admin wrapper HOC", () => {

    const text = faker.lorem.words(3);
    const Component = AdminWrapper(() => <p>
        {text}
    </p>);

    const render = (text: string, role: UserRole) =>
        renderWithUserContext(
            <Component text={text} />
            , {
                ...randomUser(
                    faker.random.uuid()
                ),
                role,
            });

    it("does not crash on render", () => {

        expect(() => {
            render("some text", "administrator");
        }).not.toThrow();
    });

    it("does show given component if user has 'administrator' role", () => {

        const { getByText } = render(text, 'administrator');
        expect(
            getByText(text)
        ).toBeInTheDocument();
    });

    it("does not show text if user does not have 'basic' role", () => {

        const { getByText } = render(text, 'basic');
        waitFor(() => {
            expect(
                getByText(text)
            ).not.toBeInTheDocument();
        });
    });
    it("Does not show if user has some random role", () => {

        const role = faker.lorem.word();

        //@ts-expect-error as the role is an arbitrary string, not `UserRole`
        const { getByText } = render(text, role);

        waitFor(() => {

            expect(
                getByText(text)
            ).not.toBeInTheDocument();
        })
    })
});