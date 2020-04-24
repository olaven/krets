import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import { App } from "../../../public/app.js";


const index_handler = get("/", () => {

    return renderBody(App);
});

const brand_page_handler = get("/:brand_name", ({params}) => {

    return params.brand_name;
})

export const frontend_handlers = [
    index_handler, brand_page_handler
]