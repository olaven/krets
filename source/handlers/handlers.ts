import { brand_handlers } from "./brand/brand_handlers.ts";
import { response_handlers } from "./response/response_handlers.ts";
import { frontend_handlers } from "./frontend/frontend_handler.ts"
import { user_handlers } from "./user/user_handler.ts";

import { TokenValidator } from "../auth/auth0.ts";

export const handlers = 
    (token_is_valid: TokenValidator) => 
        [
            ...brand_handlers(), 
            ...response_handlers(), 
            ...frontend_handlers(), 
            ...user_handlers(token_is_valid)
        ]

/* const contentType = (type: string) => "MOCK CONTENT TYPE"

const static_handler = () => 
        get(`/public/*`, ({ path }) => {

            if (path.endsWith(".ts")) {


                const compiled_code = Deno.compile(path); 
                return [200, contentType("text/plain"), compiled_code]
            }; 
        })

 */
