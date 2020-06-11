/**
 * @jest-environment jsdom
 */

import React from "react";
import IndexPage from "../../src/pages/index"
import Enzyme, { render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthModel } from "../../src/models";
import * as faker from "faker";
import { UserContext, UserContextProvider } from "../../src/context/UserContext";
import { PagesContextProvider } from "../../src/context/PagesContext";
Enzyme.configure({ adapter: new Adapter() });

describe("The home page", () => {


    it("renders something", () => {

        const wrapper = mount(<IndexPage />);
        expect(wrapper.text()).toBeTruthy();
    });

    it("Shows intro section when no user is present", () => {

        const wrapper = mount(<IndexPage />);
        expect(wrapper.text()).toContain('Information'); //TODO: have som global (wiht translation) text store
    });

    function stubFetch(
        // http status to return, eg 200
        status,
        //the json payload
        payload,
        // a function that checks if the inputs in "fetch(url, init)" are valid
        predicate) {

        //define fetch method at global level, as it is not available on NodeJS
        //@ts-ignore
        global.fetch = (url, init) => {

            console.log("INSIDE ANDREA MOCK");

            //crash if the predicate is not satisfied
            if (predicate !== null) {
                predicate(url, init);
            }

            return new Promise((resolve, reject) => {

                const httpResponse = {
                    status: status,
                    json: () => {
                        return new Promise(
                            (res, rej) => {
                                res(payload);
                            }
                        );
                    }
                };

                resolve(httpResponse);
            });
        };
    }
    it("Shows pages when user _is_ present", async () => {

        const mockUser: AuthModel = {
            sub: faker.random.uuid(),
            name: faker.name.firstName()
        }

        //FIXME: not running 
        /* global.fetch = jest.fn().mockImplementation(() => () => {
 
             console.log("INSIDE MOCKED FETCH");
             return Promise.resolve({ json: () => Promise.resolve(mockUser) } as Response);
         });*/

        global.fetch = jest.fn(() => {
            console.log("INSIDE MOCKED FETCH");
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockUser)
            } as Response);
        });


        const wrapper = mount(<UserContextProvider>
            <PagesContextProvider>
                <IndexPage />
            </PagesContextProvider>
        </UserContextProvider>, {
            // context: {
            //   user: mockUser
            //  }
        });

        wrapper.update();

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 5999);
        })

        expect(wrapper.text()).not.toContain("Information");
        expect(wrapper.text()).toContain("Dine sider!");

        delete global.fetch;
    })
});