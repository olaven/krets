import { Root } from "./components/root.jsx";
import { ReactDOMServer } from "./frontend_deps.ts";

const wrap_in_html = (rendered: string) => `
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

export const build_frontend = async () => {

    const app = Root()
    const rendered_app = ReactDOMServer.renderToString(app);
    
    const html = wrap_in_html(rendered_app);
    await Deno.create("./public/index.html");
    await Deno.writeFile("./public/index.html", new TextEncoder().encode(html));
}





