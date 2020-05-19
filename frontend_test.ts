import { assertEquals } from "./deps.ts";
import { renderToString } from "./public/deps_frontend.js";
import Home from "./public/components/home/home.js"; 

const { test } = Deno; 


test("Test code renders component", () => {

    //@ts-ignore
    const result = renderToString(Home({}));
    assertEquals(result, "test");
});