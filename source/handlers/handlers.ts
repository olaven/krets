import { brand_handlers } from "./brand/brand_handlers.ts";
import { response_handlers } from "./response/response_handlers.ts";
import { ejs_handlers } from "./ejs.ts";

export const handlers = [
    ...brand_handlers, 
    ...response_handlers, 
    ...ejs_handlers
]


