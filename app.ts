import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.ts";

//starting server
app(...handlers);

