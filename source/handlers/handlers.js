import { brand_handlers } from "./brand/brand_handlers.ts";
import { response_handlers } from "./response/response_handlers.ts";
import { frontend_handlers } from "./frontend/frontend_handler.ts"
import { user_handlers } from "./user/user_handler.ts";

export const handlers = [
    ...brand_handlers, 
    ...response_handlers, 
    ...frontend_handlers, 
    ...user_handlers,
]


