import { get, post, contentType } from '../../../deps.ts';
import { database } from '../database.ts';
import { Brand } from '../types.ts';

const get_brand = get("/api/brands/:name", ({ params }) => {

    const { name } = params; 
    const brand = database.brands.get(name); 

    if (brand) return [200, contentType("json"), JSON.stringify(brand)];
    else return [404, "resource not found"]
});

const post_brand = post("/api/brands", ({ body }) => {

    const brand = body as Brand; 
    if (!brand.name)
        return [400, "Brand must have a name"]
    if (database.brands.get(brand.name))
        return [409, "Brand already exists"]

    database.brands.set(brand.name, brand);
    database.responses.set(brand.name, []);

    return [201, "Brand created"];
});

const test = post("/api/test/:name", ({params, body}) => {

    console.log("HELLO");
    console.log("param name: ", params.name); 
    console.log("body name: ", body.name);
    return [200, "good"]
})


export const brand_handlers = [
    get_brand, post_brand, test 
]


