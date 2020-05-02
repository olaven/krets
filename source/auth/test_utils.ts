import { with_app } from "../test_utils.ts";
import { auth_handlers } from "../handlers/auth/auth_handlers.ts";

export const with_auth_app = (action: (port: number) => any) => 
    with_app(auth_handlers, action, 1234);