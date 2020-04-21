import { brand_handlers } from "./brand/brand_handlers.ts";
import { response_handlers } from "./response/response_handlers.ts";
import { get } from "../../deps.ts";


import htm from "https://unpkg.com/htm@2.2.1/dist/htm.module.js";
import { h } from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";
const html = htm.bind(h);

import { App } from "../../public/app.js";
import { renderToString } from "https://cdn.pika.dev/preact-render-to-string";

export const handlers = [
    ...brand_handlers, 
    ...response_handlers, 
    get("/", () => {

        
        const body = renderToString(html`
        <html>
            <head>
            <script src="/client.js" type="module"></script>
            </head>
            <body>
            <${App} page="All" />
            </body>
        </html>
        `);

        return body; 
    })
]


