import htm from "https://unpkg.com/htm@2.2.1/dist/htm.module.js";
import { h } from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";
const html = htm.bind(h);

//NOTE: File is JS because TS complains about types in this module
import { renderToString } from "https://cdn.pika.dev/preact-render-to-string";

/*
< script src = "https://unpkg.com/htm@2.2.1/dist/htm.module.js" > < /script>  <
    script src = "https://unpkg.com/preact@10.0.5/dist/preact.module.js" > < /script>  */

export const renderBody = (Component, client_script, script_content) => {

    return renderToString(html `
        <html>
            <head>
                <script type="module">
                

                    import { client_render } from './components/client.js'
                    import htm from 'https://unpkg.com/htm@2.2.1/dist/htm.module.js';
                    import {h,hydrate,} from 'https://unpkg.com/preact@10.0.5/dist/preact.module.js';

                    const html = htm.bind(h);

                    
                    import { Brand } from './components/brand/brand.js';

                                        //TODO: generic props object 
                    function withProps() { return ${Component}({name: 'HEI'}) }
                    client_render(${Component});
                    
                </script>
            </head>
            <body>
                <${Component} page="All" />
            </body>
        </html>
    `);
} 


