import { assertEquals } from "../../deps.ts";
import { with_response_app, post_response, get_responses } from "./test_utils.ts";
import { post_brand } from "../brand/test_utils.ts";

const { test } = Deno; 

test("Response-array is initialized when a new company is created", with_response_app(async (port) => {

    await post_brand(port, {name: "new brand"}); 
    const response = await get_responses(port, "new brand"); 
    const responses = await response.json(); 

    assertEquals([], responses);
}));

test("can post response", with_response_app(async (port) => {

    await post_brand(port, { name: "brand_name" })
    const response = await post_response(port, "brand_name", {
        indicator: 'smile',
        comment: 'positive comment'
    }); 

    assertEquals(201, response.status);
}));