import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import { Home } from "../../../public/components/home/home.js";
import Brand from "../../../public/components/brand/brand.js";


const index_handler = get("/", () => 
    renderBody(Home, "./components/home/render.js"));
    

//NOTE: passing script here, as that allows for the props to pass as well. Generalize when working 
const brand_page_handler = get("/:name", ({params}) => 
    renderBody(Brand, "./components/brand/brand.js"));

export const frontend_handlers = [
    brand_page_handler, index_handler
]