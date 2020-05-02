import { build_query, login } from "./login.ts";
import { assertThrows, assertEquals, assertNotEquals } from "../../deps.ts";
import { load_environment, clear_environment } from "../../environment.ts";
import { with_auth_app } from "./test_utils.ts";
const { test } = Deno; 


test("Login runs", with_auth_app(async (port) => {

    await load_environment();
    console.log("before login");
    const response = await login(port);
    console.log("after login");
    await response.arrayBuffer();
    await clear_environment(); 
}))

test(`build_query returns something`, () => {

    const query = build_query({key: "value", another: "avalue"}); 
    assertNotEquals(query, null);
    assertNotEquals(query, undefined);
}); 

test(`build_query retuns key value separated by "="`, () => {

    const query = build_query({first: "first_value"}); 
    assertEquals(query, "?first=first_value")
});


test(`build_query retuns multiple key value separated by "&"`, () => {

    const query = build_query({f: "fv", s: "sv", t: "tv"}); 
    assertEquals(query, "?f=fv&s=sv&t=tv")
});

test("query_builder returns string prefixed by ?", () => {

    const query = build_query({ f: "fv", s: "sv" });
    assertEquals(query, "?f=fv&s=sv");
})