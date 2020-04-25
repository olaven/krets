import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import { Home } from "../../../public/components/home/home.js";
import { Brand } from "../../../public/components/brand/brand.js";


const index_handler = get("/", () => 
    renderBody(Home, "./components/home/render.js"));

const brand_page_handler = get("/:name", ({params}) => 
    renderBody(() => Brand({ name: params.name }), "./components/brand/render.js")
);

export const frontend_handlers = [
    brand_page_handler, index_handler
]