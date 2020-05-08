import { assertEquals } from "../../../deps.ts";
import { with_response_app, post_response, get_responses } from "./test_utils.ts";
import { post_brand, with_brand_app } from "../brand/test_utils.ts";
import { as_user } from "../../test_utils.ts";
import { Response } from "../types.ts";

const { test } = Deno; 

test("Can GET response", with_response_app(port =>
    as_user(async ({ id }) =>  {
    
        const brand_name = "GETBrand";
        await post_brand(port, { name: brand_name, owner_id: id }); 

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
        await post_brand(port, { name, owner_id: id }); 
        const response = await get_responses(port, name); 
        const responses = await response.json(); 

        assertEquals([], responses);
    }))
);

test("can post response", with_response_app(async (port) =>
    as_user(async ({ id }) => {

        const brand_name = "new brand";
        await post_brand(port, { name: brand_name, owner_id: id })
        const response = await post_response(port, brand_name, {
            indicator: 'smile',
            comment: 'positive comment'
        }); 

        assertEquals(201, response.status);
    }))
); 
