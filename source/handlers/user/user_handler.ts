import { get, post, contentType } from "../../../deps.ts";
import { ok, not_found, error, created, not_authorized, conflict} from "../http_responses.ts";
import { database } from "../database.ts";

import { TokenValidator } from "../../auth/auth0.ts";


export const user_handlers = 
    (token_is_valid: TokenValidator) => [
        
        get("/api/users/:name", ({ params }) => {

            //TODO: Auth0 token validation or something like it
            const { id } = params;
            const user = database.users.get(id);

            if (!user) {
                not_found();
            }
            
            return ok(user);
        }),

        post("/api/users", async ({ params }) => {

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
        }),
    ]
