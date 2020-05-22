import { get, post, contentType } from "../../../deps.ts";
import { created, not_found, ok, error } from "../http_responses.ts";
import { Response } from "../types.ts";
import { database } from "../database.ts";

const get_responses = get("/api/brands/:brand_name/responses", ({params}) => {

    const { brand_name } = params
    const responses = database.responses.get(brand_name);

    if (!responses && responses !== []) 
        return not_found(`Responses for ${brand_name} does not exist`)        

    return ok(responses)
});

const post_response = post("/api/brands/:brand_name/responses", ({params, body}) => {


    const { brand_name } = params; 
    const { indicator, comment } = JSON.parse(body);
    const response = { indicator, comment }

    if ((!response.comment && response.comment !== '') || !response.indicator)
        return error(`${response} is not a valid response`);

    //FIXME: contains a lot of reads. Is inefficient 
    if (!database.responses.get(brand_name)) 
        database.responses.set(brand_name, []);

    const existing_responses = database.responses.get(brand_name) as Response[]
    database.responses.set(brand_name, [ response, ...existing_responses ])

    return created()
});


export const response_handlers = () => [
    get_responses, 
    post_response
]