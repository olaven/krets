import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import { Home } from "../../../public/components/home/home.js";


const index_handler = get("/", () => 
    renderBody(Home, "./components/home/render.js"));

const brand_page_handler = get("/:brand_name", ({params}) => {

    return params.brand_name;
})

export const frontend_handlers = [
    index_handler, brand_page_handler
]