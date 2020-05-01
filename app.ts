
import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.js";
import { dotenv } from "./dotenv.ts";



//loading env
await dotenv()

console.log(Deno.env.toObject())


//starting server
app(...handlers);

