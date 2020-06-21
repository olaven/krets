/**
 * @jest-environment jsdom
 */

import React from "react";
import CodePage from "../../src/pages/[pageId]/code"
import Enzyme, { render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RouterContext } from 'next-server/dist/lib/router-context';
import * as nextRouter from 'next/router';
import { UserContext, UserContextProvider } from "../../src/context/UserContext";
import { PagesContextProvider } from "../../src/context/PagesContext";
import { createRouter } from 'next/router';
import { users } from "../../src/database/users";



Enzyme.configure({ adapter: new Adapter() });


describe("The QR/code page", () => {

    //@ts-ignore
    nextRouter.useRouter = jest.fn();
    //@ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({ query: {
        pageId: "some mock pageid"
    } }));

    it("'loading' while waiting for page", async () => {

            const component = render(<CodePage />);
            expect(component.text()).toContain("Loading"); 
    });
});  