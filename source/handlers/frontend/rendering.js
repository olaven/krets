import { renderToString, h } from "../../../public/deps_frontend.js";

export const renderBody = (Component, component_path, props) => {

    const rendered = renderToString(h(Component, props));
    const stringified_props = JSON.stringify(props)


    return `
        <html>
            <head>
                <script type="module">
​
                    import { h, hydrate } from 'https://cdn.pika.dev/preact';
                    import Component from '${component_path}';
                    
					const jsx = h(Component, ${stringified_props});
					hydrate(jsx, document.getElementById("root"));
                </script>
            </head>
            <body>
                    <div id="root">
                        ${rendered}
                    </div>
            </body>
        </html>`
}