import { assertEquals } from "../../../deps.ts";
import { Brand, User } from "../types.ts";
import { database } from "../database.ts";
import { as_user, post_brand, fetch_brand, get_brands, with_brand_app } from "../../test_utils.ts";


const { test } = Deno; 


test("Can GET brand", with_brand_app(port => 
    as_user(async ({ id }) => {

        const name = "test";
        await post_brand(port, { name: name, owner_id: id, url_name: name });
        const response = await fetch_brand(port, name);
        assertEquals(200, response.status);
    })
));

test("Fetched brand has same name as requested", with_brand_app(port => 
    as_user(async ({ id }) => {

        const name = "testname";
        await post_brand(port, { name, owner_id: id, url_name: name }); 

        const response = await fetch_brand(port, name); 
        const brand = await response.json(); 

        assertEquals(name, brand.name); 
    }))
);

test("Can POST brand", with_brand_app((port) => 
    as_user(async ({ id }) => {

        const brand: Brand = { name: "my new brand", owner_id: id, url_name: "my-new-brand" }; 
        const response = await post_brand(port, brand); 
        assertEquals(201, response.status);
    }))
);

test("Cannot post if brand name already exists", with_brand_app((port) => 
    as_user(async ({ id }) => {

        const brand = { name: "brand", owner_id: id, url_name: "brand" }; 
        const first_response = await post_brand(port, brand); 
        const second_response = await post_brand(port, brand); 

        assertEquals(201, first_response.status);
        assertEquals(409, second_response.status);
    })) 
);

test("Brand uniquenes is checked with url_name, not regular name", with_brand_app((port) => 
    as_user(async ({ id }) => {

        const full_name = "name"; 
        const url_name = "url_name";
        const DIFFERENT_URL = "url_name_b";

        const orignal = { name: full_name, url_name: url_name, owner_id: id};
        const duplicate_full_name = { name: full_name, url_name: DIFFERENT_URL, owner_id: id };
        const duplicate_url_name = { name: "ORIGINAL NAME", url_name: url_name, owner_id: id };

        const original_response = await post_brand(port, orignal)
        assertEquals(original_response.status, 201);

        const full_name_response = await post_brand(port, duplicate_full_name);
        assertEquals(full_name_response.status, 201); 

        const url_name_response = await post_brand(port, duplicate_full_name);
        assertEquals(url_name_response.status, 409);
    })
));

test("Can get brands by owner", with_brand_app(port => 
    as_user(async ({ id }) => {

        const first_expected_name = "first_expected";
        const second_expected_name = "second_expected";

        [
            { name: first_expected_name, owner_id: id , url_name: "some-url-name"},
            { name: second_expected_name, owner_id: id , url_name: "some-url-name"},
            { name: "first_UNEXPECTED", owner_id: "another_id", url_name: "some-url-name"},
            { name: "second_UNEXPECTED", owner_id: "yet_another_id", url_name: "some-url-name"},
        ].forEach(brand => {

            database.brands.set(brand.name, brand); 
        }); 

        const response = await get_brands(port, id);

        assertEquals(response.status, 200);
        const received_brands = (await response.json()) as Brand[]; 

        received_brands.forEach(brand => {
            assertEquals(brand.owner_id, id);
        });
        assertEquals(received_brands.length, 2); 
        assertEquals(database.brands.size, 4);
    })
))



test("Returns 404 if the brand is not present", with_brand_app(async (port) => {

    const response = await fetch_brand(port, "somebrand");
    assertEquals(404, response.status);
})); 
