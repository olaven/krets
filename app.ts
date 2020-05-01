
import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.js";
import { load_environment } from "./environment.ts";



//loading env
await load_environment();

//starting server
app(...handlers);

