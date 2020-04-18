import { get, post, contentType } from "../../../deps.ts";
import { Response } from "../types.ts";
import { database } from "../database.ts";

const get_responses = get("/api/brands/:brand_name/responses", ({params}) => {

    const { brand_name } = params
    const responses = database.responses.get(brand_name);

    if (!responses && responses !== []) {

        console.log("COuld not find", responses)
        return [404, `Responses for ${brand_name} does not exist`];
    }
        

    return [200, contentType('json'), JSON.stringify(responses)]; 
});

const post_response = post("/api/brands/:brand_name/responses", ({params, body}) => {

    console.log("HEISANN ");
    const { brand_name } = params; 
    const response = body as Response;

    if (!response.comment || !response.indicator)
        return [400, `${response} is not a valid response`]; 


    if (!database.responses.get(brand_name)) 
        database.responses.set(brand_name, []);

    const existing_responses = database.responses.get(brand_name) as Response[]
    database.responses.set(brand_name, [ response, ...existing_responses ])

    return [201, "Created response"];
});


export const response_handlers = [
    get_responses, 
    post_response
]