import { App } from "../../deps.ts";
import { Brand } from "../types.ts";
import { brand_handlers } from "./brand_handlers.ts";

export const with_app = (action: (port: number) => any) => async () => {

    const port = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
    const app = new App(port); 
    app.serve(); 
    app.register(...brand_handlers);
    
    await action(port); 
    app.close();
} 

export const fetch_brand = async (port: number, brand_name: string) => {

    const response = await fetch(`http://localhost:${port}/api/brands/${brand_name}`); 
    await response.arrayBuffer(); //https://github.com/denoland/deno/issues/4735
    return response
}

export const post_brand = async (port: number, brand: Brand) => {

    const response = await fetch(`http://localhost:${port}/api/brands`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(brand)
    }); 

    await response.arrayBuffer(); 
    return response; 
}
