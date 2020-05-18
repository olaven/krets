import { renderToString, h } from "../../../public/deps_frontend.js";

export const renderBody = (Component, component_path, props) => {

    
    //const rendered = renderToString(h(Component, props)); //FIXME: crashes .lenght of undefined in htm
    const rendered = ""; 
    const stringified_props = JSON.stringify(props)

    return `
        <html>
            <head>
                <script type="module">
                    import { h, hydrate } from 'https://cdn.pika.dev/preact';
                    import Component from '${component_path}';
                    
					const jsx = h(Component, ${stringified_props});
					hydrate(jsx, document.getElementById("root"));
                </script>
            </head>
            <!-- Script to load page faster -->
            <script src="//instant.page/5.0.1" type="module" integrity="sha384-0DvoZ9kNcB36fWcQApIMIGQoTzoBDYTQ85e8nmsfFOGz4RHAdUhADqJt4k3K2uLS"></script>
            <body>
                    <div id="root">
                        ${rendered}
                    </div>
            </body>
        </html>`
}