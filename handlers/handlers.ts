import { brand_handlers } from "./brand/brand_handlers.ts";
import { response_handlers } from "./response/response_handlers.ts";

export const handlers = [
    ...brand_handlers, 
    ...response_handlers
]


