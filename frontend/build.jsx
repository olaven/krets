import { App, NewApp } from "./app.jsx";
import React from "https://dev.jspm.io/react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";

const app = App()
if (React.isValidElement(app)){

    const rendered = ReactDOMServer.renderToString(app); 
    console.log("rendered", rendered);
}




