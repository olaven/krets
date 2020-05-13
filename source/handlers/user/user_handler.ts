import { get, post, contentType } from "../../../deps.ts";
import { ok, not_found, error, created, not_authorized, conflict} from "../http_responses.ts";
import { database } from "../database.ts";

import { TokenValidator } from "../../auth/auth0.ts";


export const user_handlers = 
    (token_is_valid: TokenValidator) => [
        
        get("/api/users/:id", ({ params }) => {

            //TODO: Auth0 token validation or something like it
            const { id } = params;
            const user = database.users.get(id);
            
            if (!user) {
                return not_found();
            }
            
            return ok(user);
        }),

        post("/api/users", async (context) => {

            const { id } = (JSON.parse(context.body));
            const access_token = context.headers.get("Authorization")?.split(" ")[1];

            if (!id || !access_token)
                return error("id and auth_token must be defined");

            if (database.users.get(id)) 
                return conflict("User already exists");

            if (await token_is_valid(access_token)) {

                database.users.set(id, {
                    id 
                });

                console.log("posted user", {id})
                return created()
            }

            return not_authorized();
        }),
    ]
