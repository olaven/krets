import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import Brand from "../../../public/components/brand.js";
import Home from "../../../public/components/home.js";

import { get_auth0 } from "../../auth/auth0.ts"


const index_handler = get("/", context => {

    const { auth0_client_id, auth0_domain, host_uri } = get_auth0();
    return renderBody(Home, "./components/home.js", 
        { auth0_client_id, auth0_domain, host_uri }
    );
}) 

    
//NOTE: passing script here, as that allows for the props to pass as well. Generalize when working 
const brand_page_handler = get("/:name", ({params}) => 
    renderBody(Brand, "./components/brand.js", { name: params.name }));


export const frontend_handlers = [
    brand_page_handler, index_handler
]