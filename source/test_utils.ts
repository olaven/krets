import { App } from "../deps.ts";
import { User } from "./handlers/types.ts";
import { database } from "./handlers/database.ts";

const random_port = () => 
    Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;

/**
 * Starts a server with given handlers on a random port. 
 * `action` is executed before the server is stopped. 
 * The port is received through the paramter of `action`
 * @param handlers 
 * @param action 
 */
export const with_app = (handlers: any[], action: (port: number) => any, port = random_port()) => async () => {

    const app = new App(port); 
    
    app.serve();
    app.register(...handlers);
    
    await action(port); 
    app.close();
} 

export const as_user = async (action: (user: User) => Promise<void> | void) => {
    //TODO: generate random string

    const id = Math.random().toString(36).substring(7);
    const user = { id };
    //TODO: add to db
    await action(user);
    //TODO: remove from db
};

export const test_get = async (url: string) => {

    const response = await fetch(url); 
    await response.arrayBuffer(); //https://github.com/denoland/deno/issues/4735
    return response
}

export const test_post = async <T> (url: string, payload: T) => {

    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }); 

    await response.arrayBuffer(); 
    return response; 
}