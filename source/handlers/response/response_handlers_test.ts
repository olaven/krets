import { assertEquals } from "../../../deps.ts";
import { as_user, post_response, get_responses, with_response_app, post_brand } from "../../test_utils.ts";
import { Response } from "../types.ts";

const { test } = Deno; 


test("Can GET response", with_response_app(port =>
    as_user(async ({ id }) =>  {
    
        const brand_name = "GETBrand";
        await post_brand(port, { name: brand_name, owner_id: id, url_name: brand_name }); 

        const posted_responses: Response[] = [
            { indicator: 'smile', comment: "hei" }
        ]; 

        for (let response of posted_responses) {

            await post_response(port, brand_name, response);
        }

        const received_responses = await (await get_responses(port, brand_name)).json(); 
        assertEquals(posted_responses, received_responses)
    }))
);

test("Response-array is initialized when a new company is created", with_response_app((port) =>
    as_user(async ({ id }) => {

        const name = "fresh_brand"
        await post_brand(port, { name, owner_id: id, url_name: name }); 
        const response = await get_responses(port, name); 
        const responses = await response.json(); 

        assertEquals([], responses);
    }))
);

test("can post response", with_response_app(async (port) =>
    as_user(async ({ id }) => {

        const brand_name = "new brand";
        await post_brand(port, { name: brand_name, owner_id: id, url_name: brand_name })
        const response = await post_response(port, brand_name, {
            indicator: 'smile',
            comment: 'positive comment'
        }); 

        assertEquals(201, response.status);
    }))
); 


test("Empty comment is OK", with_response_app(async (port) =>
    as_user(async ({ id }) => {

        const brand_name = "new brand";
        await post_brand(port, { name: brand_name, owner_id: id, url_name: brand_name })
        const response = await post_response(port, brand_name, {
            indicator: 'smile',
            comment: '' //NOTE: empty
        }); 

        assertEquals(201, response.status);
    }))
); 