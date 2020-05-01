import { build_query, login } from "./login.ts";
import { assertThrows, assertEquals, assertNotEquals } from "../../deps.ts";
import { load_environment, clear_environment } from "../../environment.ts";
const { test } = Deno; 


test("Login runs", async () => {

    await load_environment();
    const response = await login();
    await response.arrayBuffer()
    await clear_environment(); 
})

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