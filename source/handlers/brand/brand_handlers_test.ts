import { assertEquals } from "../../../deps.ts";
import { Brand } from "../types.ts";
import { with_brand_app, fetch_brand, post_brand } from "./test_utils.ts";


const { test } = Deno; 

test("Can GET brand", with_brand_app(async port => {

    await post_brand(port, { name: "test" });
    const response = await fetch_brand(port, "test");
    assertEquals(200, response.status);
}));

test("Fetched brand has same name as requested", with_brand_app(async (port) => {

    const name = "testname";
    await post_brand(port, { name }); 

    const response = await fetch_brand(port, name); 
    const brand = await response.json(); 

    assertEquals(name, brand.name); 
}));

test("Can POST brand", with_brand_app(async (port) => {

    const brand: Brand = { name: "my new brand" }; 
    const response = await post_brand(port, brand); 
    assertEquals(201, response.status);
}));

test("Cannot post if brand name already exists", with_brand_app(async (port) => {

    const brand = { name: "brand" }; 
    const first_response = await post_brand(port, brand); 
    const second_response = await post_brand(port, brand); 

    assertEquals(201, first_response.status);
    assertEquals(409, second_response.status);
}));

test("Returns 404 if the brand is not present", with_brand_app(async (port) => {

    const response = await fetch_brand(port, "somebrand"); 
    assertEquals(404, response.status);
})); 

test("Separating body and params", with_brand_app(async (port) => {

    const body = JSON.stringify({ name: "body_name" }); 
    const response = await fetch(`http://localhost:${port}/api/test/param_name`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    });

    assertEquals(response.status, 200);
}))