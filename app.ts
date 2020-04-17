import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.ts";
import { build_frontend } from "./source/frontend/build_frontend.ts";

//building frontend 
await build_frontend(); 

//starting server
app(...handlers);

