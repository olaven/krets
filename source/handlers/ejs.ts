/* Testign EJS templates as alternative to React */
import { get } from "../../deps.ts";
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';

const ejs = get("/ejs", async () => await renderFile("./source/handlers/template.ejs", { message: "new message" }))


export const ejs_handlers = [ ejs ]