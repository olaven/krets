import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"


const index_handler = get("/", () => 
    renderBody("./components/home.js"))
    

//NOTE: passing script here, as that allows for the props to pass as well. Generalize when working 
const brand_page_handler = get("/:name", ({params}) => 
    renderBody("./components/brand.js", { name: params.name }));

export const frontend_handlers = [
    brand_page_handler, index_handler
]