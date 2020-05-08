import { get, post, contentType } from "../../../deps.ts";
import { database } from "../database.ts";
import { token_is_valid } from "../../auth/auth0.ts";


//TODO: separate this out to separate module and rewrite handlers with it 
const ok = <T> (payload: T): [number, { "Content-Type": string }, string] => 
    [200, contentType("json"), JSON.stringify(payload)]; 

const basic_response = (code: number, message: string): [number, string] => 
    [code, message]

const not_found = () => 
    [404, "Resource not found"];

const error = (message = ""): [number, string] => 
    basic_response(400, message);

const created = (message = "Created.") => 
    basic_response(201, message);

const conflict = (message = "Conflicting resource") => 
    basic_response(409, message)

const not_authorized = () => 
    basic_response(403, "Unauthorized");

const not_authenticated = () => 
    basic_response(401, "Unauthenticated");

const get_user = get("/api/users/:name", ({ params }) => {

    //TODO: Auth0 token validation or something like it
    const { id } = params;
    const user = database.users.get(id);

    if (!user) {
        not_found();
    }
    return ok(user);
});

/**
 * body: access_token, id 
 */
const post_user = post("/api/users", async ({ params }) => {

    const {id, auth_token: access_token} = params; 
    if (!id || !access_token)
        return error("id and auth_token must be defined");

    if (database.users.get(id)) 
        return conflict("User already exists");

    if (await token_is_valid(access_token)) {

        database.users.set(id, {
            id 
        });
        return created()
    }

    return not_authorized();
});




export const user_handlers = [
    get_user, post_user
]
