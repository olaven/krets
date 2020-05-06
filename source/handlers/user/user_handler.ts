import { get, post, contentType } from "../../../deps.ts";
import { database } from "../database.ts";
/**
 * TODO: check how to verify users token/code with Auth0 
 * I.e. receive some token/code from user along with id, and 
 * see if they match when doing any kind of updating 
 */


const json_response = <T> (payload: T): [number, { "Content-Type": string }, string] => 
    [200, contentType("json"), JSON.stringify(payload)]; 

const not_found = () => 
    [404, "Resource not found"];

const get_user = get("/api/brands/:name", ({ params }) => {

    //TODO: Auth0 token validation or something like it
    const { id } = params;
    const user = database.users.get(id);

    if (!user) {
        not_found();
    }
    return json_response(user);
});




export const user_handlers = [
    get_user
]
