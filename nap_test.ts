import { App, get, post, contentType } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { handlers } from "./nap.ts";
import { assertEquals, assert, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";



const { test } = Deno; 


test("getting some test to run", () => {

    assertEquals(2, 2);
}); 

test("instantiating app", () => {

    const app = new App(1234); 
    assert(true);
}); 

test("serving and closing app", async () => {

    const app = new App(1234); 
    app.serve(); 
    await app.close()
}); 

const with_server = (action: (port: number) => any) => async () => {

    const port = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
    const app = new App(port); 
    
    app.serve(); 
    action(port); 
    await app.close();
} 

test("with app in function", () => {
    
    with_server(() => {

        assert(true);
    });
});

test("minimize syntax", with_server(() => {

    assert(true);
}));

test("with port", with_server(port => {

    assertNotEquals(undefined, port);
}));

test("fetching", with_server(async port => {

    const response = await fetch(`http://localhost:${port}/api/brands/test`);
    assertEquals(200, response.status);
}));