import { get } from "../../../deps.ts";

import { renderBody } from "./rendering.js"
import Brand from "../../../public/components/brand.js";
import Home from "../../../public/components/home.js";

import Register from "../../../public/components/register.js";
import { get_auth0 } from "../../auth/auth0.ts"


const index_handler = get("/", () => 
    renderBody(Home, "./components/home.js", {}))
    

//NOTE: passing script here, as that allows for the props to pass as well. Generalize when working 
const brand_page_handler = get("/:name", ({params}) => 
    renderBody(Brand, "./components/brand.js", { name: params.name }));

//NOTE: JUST TESTING 
const register_handler_FLOW_test = get("/p/register", context => {

    const { auth0_client_id, auth0_domain, host_uri } = get_auth0() 

    return renderBody(Register, "../components/register.js", {
        auth0_client_id, auth0_domain, host_uri
    }); 
});
    

export const frontend_handlers = [
    brand_page_handler, index_handler, register_handler_FLOW_test
]