import { App } from "./deps.ts";
import { handlers } from "./nap.ts";
import { assertEquals, assert, assertNotEquals } from "./deps.ts";



const { test } = Deno; 

const with_server = (action: (port: number) => any) => async () => {

    const port = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
    const app = new App(port); 
    app.serve(); 
    app.register(...handlers);
    
    await action(port); 
    app.close();
} 

test("Can fetch server in test", with_server(async port => {

    const response = await fetch(`http://localhost:${port}/api/brands/test`);
    await response.text();
    assertEquals(200, response.status);
}));