/**
 * @jest-environment jsdom
 */

import React, { createElement } from "react";
import { act } from "react-dom/test-utils";
import IndexPage from "../../src/pages/index"
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("The home page", () => {


    it("renders something", () => {

        const wrapper = render(<IndexPage />);
        expect(wrapper.text()).toBeTruthy(); 
    });

    it ("Shows intro section when no user is present", () => {

        const wrapper = render(<IndexPage />);
        expect(wrapper.text()).toContain('Information'); //TODO: have som global (wiht translation) text store
    });
});