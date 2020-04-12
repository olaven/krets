import { Drash } from "./deps.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ResponsesAPI, get_server_config } from "./app.ts";

const { Server } = Drash.Http


let port: number; 

const server_test = async (name: string, test: () => any) => {

    const wrapped = async () => {
        
        const server = new Drash.Http.Server(get_server_config(2000));
        console.log(server);
        server.run(); 

        try {
            
            await test(); 
        } finally {
            
            await server.close();
        }
    }

    Deno.test(name, wrapped);
}

const fetch_responses = (brand_name: string) => 
    fetch(`http://localhost:${port}/api/brands/${brand_name}/responses`)

server_test("Wrapped test", async () => {

    const response = await fetch_responses("test");
    const json = await response.json(); 
    assertEquals(json.responses, []);
});
