//NOTE: File is JS because TS complains about types in this module
import { renderToString } from "../../../public/deps_frontend.js";

export const renderBody = (Component, component_path, props) => {

    const stringified_props = JSON.stringify(props)
    const rendered = renderToString(Component(stringified_props))

    return `
        <html>
            <head>
                <script type="module">

                    import { h as preact, hydrate } from 'https://cdn.pika.dev/preact';
                    import htm from "https://cdn.pika.dev/htm";
                    
                    export const h = htm.bind(preact);

                    const client_render = (Component) => {
                        
                        const jsx = h \`<\${Component} page="All" />\`
                        const hydrated = hydrate(jsx, document.getElementById("root"));
                        return hydrated
                    }
                                    
                    import Component from '${component_path}';
                    client_render(() => Component(${stringified_props}));

                </script>
            </head>
            <body>
                    <div id="root">
                        ${rendered}
                    </div>
            </body>
        </html>`
} 


