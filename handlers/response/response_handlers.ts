import { get, post, contentType } from "../../deps.ts";
import { database } from "../database.ts";

const get_responses = get("/api/brands/:brand_name/responses", ({params}) => {

    const { name: brand_name } = params; 
    const responses = database.responses.get(brand_name); 

    if (!responses && responses !== [])
        return [404, `Responses for ${brand_name} does not exist`];

    return [200, contentType('json'), responses]; 
});

const post_response = post("/api/brands/:brand_name/responses", ({params}) => {


});


export const response_handlers = [
    get_responses, 
    post_response
]