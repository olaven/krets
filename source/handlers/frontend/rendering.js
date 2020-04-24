import htm from "https://unpkg.com/htm@2.2.1/dist/htm.module.js";
import { h } from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";
const html = htm.bind(h);

//NOTE: File is JS because TS complains about types in this module
import { renderToString } from "https://cdn.pika.dev/preact-render-to-string";

export const renderBody = (Component) => renderToString(html `
    <html>
        <head>
            <script src="./client.js" type="module"></script>
        </head>
        <body>
            <${Component} page="All" />
        </body>
    </html>
`);


