import { app } from "./deps.ts";
import { handlers } from "./handlers/handlers.ts";
import { build } from "./frontend/build.jsx";

//building frontend 
await build(); 

//starting server
app(...handlers);

