import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.js";

//starting server
app(...handlers);

