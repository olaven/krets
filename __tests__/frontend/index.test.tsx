/**
 * @jest-environment jsdom
 */

import React from "react";
import IndexPage from "../../src/pages/index"
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthModel } from "../../src/models";
import * as faker from "faker";
Enzyme.configure({ adapter: new Adapter() });

describe("The home page", () => {


    it("renders something", () => {

        const wrapper = render(<IndexPage />);
        expect(wrapper.text()).toBeTruthy();
    });

    it("Shows intro section when no user is present", () => {

        const wrapper = render(<IndexPage />);
        expect(wrapper.text()).toContain('Information'); //TODO: have som global (wiht translation) text store
    });


    it("Shows pages when user _is_ present", () => {

        const mockUser: AuthModel = {
            sub: faker.random.uuid(),
            name: faker.name.firstName()
        }

        //FIXME: not running 
        global.fetch = jest.fn().mockImplementation(() => () => {

            console.log("INSIDE MOCKED FETCH");
            return Promise.resolve({ json: () => Promise.resolve(mockUser) } as Response);
        });

        const wrapper = render(<IndexPage />);
        expect(wrapper.text()).not.toContain("Information");
        expect(wrapper.text()).toContain("Dine sider!");

        global.fetch.mockClear();
        delete global.fetch;
    })
});