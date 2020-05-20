
import { app } from "./deps.ts";
import { handlers } from "./source/handlers/handlers.ts";
import { load_environment } from "./environment.ts";
import { token_is_valid } from "./source/auth/auth0.ts";


//loading env
try {

    await load_environment();
} catch(error) {

    console.warn("Could not load .env"); 
    console.warn("->", error);
}

console.log("AUTH0_DOMAIN: ", Deno.env.get("AUTH0_DOMAIN"));

//starting server
app(...handlers(token_is_valid));

