
import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.ts";
import { load_environment } from "./environment.ts";
import { token_is_valid } from "./source/auth/auth0.ts";


//loading env
await load_environment();

//starting server
app(...handlers(token_is_valid));

