import { App } from "../deps.ts";
import { User, Brand, Response } from "./handlers/types.ts";
import { database } from "./handlers/database.ts";
import { handlers } from "./handlers/handlers.ts";
import { brand_handlers } from "./handlers/brand/brand_handlers.ts";
import { response_handlers } from "./handlers/response/response_handlers.ts";

const random_port = () => 
    Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;

/**
 * Starts a server with given handlers on a random port. 
 * `action` is executed before the server is stopped. 
 * The port is received through the paramter of `action`. 
 * 
 * Also runs with DB started up and clead afterwards
 *  
 * @param handlers 
 * @param action 
 */
const with_app = (handlers: any[], action: (port: number) => any, port = random_port()) => async () => {

    await with_db(async () => {
    
        const app = new App(port);

        app.serve();
        app.register(...handlers);

        await action(port);

        app.close();
    });
} 


/**
 * Starts up the database before test runs
 * and clears it afterwards 
 * @param action 
 */
export const with_db = async (action: () => any) => {

    //TODO: enable fresh db when relevant (maps right now)
    await action(); 

    database.brands.clear();
    database.responses.clear();
    database.users.clear();
}


export const as_user = async (action: (user: User) => Promise<void> | void) => {

    const id = Math.random().toString(36).substring(7);
    const user = { id };

    database.users.set(id, user);
    await action(user);
};

const test_get = async (url: string, options: any = {}) => {

    const response = await fetch(url, options); 
    await response.arrayBuffer(); //https://github.com/denoland/deno/issues/4735
    return response
}

const test_post = async <T> (url: string, payload: T, options: RequestInit = {}) => {

    const headers = { ...(options.headers) }

    const merged_options = {
        ...options,
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(payload), 
    }
    
    
    const response = await fetch(url, merged_options); 
    await response.arrayBuffer(); 
    return response; 
}

/**
 * ====================================
 * Utils for testing response endpoints
 * ====================================
 */


//NOTE: contains both response and brand endpoints, as brand-endpoints are needed in test 
export const with_response_app = (action: (port: number) => any) => 
    with_app([...brand_handlers(), ...response_handlers()], action); 

export const get_responses = async (port: number, brand_name: string) => 
    test_get(`http://localhost:${port}/api/brands/${brand_name}/responses`); 

export const post_response = async (port: number, brand_name: string, response: Response) => 
    test_post(`http://localhost:${port}/api/brands/${brand_name}/responses`, response); 

/**
 * =================================
 * Utils for testing brand endpoints
 * =================================
 */

export const with_brand_app = (action: (port: number) => any) => 
    with_app(brand_handlers(), action)

export const fetch_brand = async (port: number, brand_name: string) => 
    test_get(`http://localhost:${port}/api/brands/${brand_name}`);

export const get_brands = async (port: number, owner_id: string) => 
    test_get(`http://localhost:${port}/api/brands?id=${owner_id}`);

export const post_brand = async (port: number, brand: Brand) => 
    test_post(`http://localhost:${port}/api/brands`, brand)


const authorization_header = (access_token: string) => ({
    headers: { 'Authorization': `Bearer ${access_token}` }
}); 


/**
 * ===============================
 * Utils for testing user endpints
 * ===============================
 */

export const fetch_user = async (port: number, user_id: string, access_token: string) => 
    test_get(`http://localhost:${port}/api/users/${user_id}`, authorization_header(access_token));

export const post_user = async (port: number, user: User, access_token: string) => 
    test_post(`http://localhost:${port}/api/users`, user, authorization_header(access_token));


export const user_test = (valid_tokens: string[], action: (port: number, user: User) => (void | Promise<void>)) => {

    const mock_token_validator = async (access_token: string) => 
        valid_tokens.includes(access_token); 
    
    //TODO: with db 
    return with_app(handlers(mock_token_validator), (port) => 
        as_user(user => action(port, user))
    );
}