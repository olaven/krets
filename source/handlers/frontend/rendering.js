//NOTE: File is JS because TS complains about types in this module
import { renderToString } from "https://cdn.pika.dev/preact-render-to-string/";


export const renderBody = (Component, component_path, props) => {

    const stringified_props = JSON.stringify(props)
    const withProps = () => Component(stringified_props)
    
    return `
        <html>
            <head>
                <script type="module">
                
                    import htm from 'https://cdn.pika.dev/htm@2.2.1';
                    import {h,hydrate,} from 'https://cdn.pika.dev/preact';
                    const html = htm.bind(h);

                    function client_render(Component) {
    
                        const jsx = html \`<\${Component} page="All" />\`
                        const hydrated = hydrate(jsx, document.body);
                        return hydrated
                    }
                                    
                    import Component from '${component_path}';
                    function withProps() { return Component(${stringified_props}) }
                    client_render(withProps);
                </script>
            </head>
            <body>
                ${renderToString(withProps())}
            </body>
        </html>`
} 


