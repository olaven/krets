import { App, NewApp } from "./app.jsx";
import React from "https://dev.jspm.io/react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";

const wrap_in_html = (rendered) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Krets</title>
    </head>
    <body>
        ${rendered}
    </body>
    </html>
`


const app = App()
const rendered_app = ReactDOMServer.renderToString(app);
const html = wrap_in_html(rendered_app); 
await Deno.create("./public/index.html");
await Deno.writeFile("./public/index.html", new TextEncoder().encode(html));




