import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { server } from "./app.ts";
const { test } = Deno;



const port = Math.floor(Math.random()*(9000-1000+1)+1000);
const s = server(port)
test("Wrapped test", async () => {

    s.run()
    let response = await fetch(`http://localhost:${port}/api/brands/test/responses`, {
        method: "GET",
    });
    const json = await response.json(); 
    console.log("HEI", json)
    assertEquals(JSON.parse(await response.json()), []);
    s.close()
})
