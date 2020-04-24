import { get, post, contentType } from '../../../deps.ts';
import { database } from '../database.ts';
import { Brand } from '../types.ts';

const get_brand = get("/api/brands/:name", ({ params }) => {

    const { name } = params; 
    const brand = database.brands.get(name); 

    if (brand) return [200, contentType("json"), JSON.stringify(brand)];
    else return [404, "resource not found"]
});

const post_brand = post("/api/brands", ({ params }) => {

    const brand = params as Brand; 
    if (!brand.name)
        return [400, "Brand must have a name"]
    if (database.brands.get(brand.name))
        return [409, "Brand already exists"]

    database.brands.set(brand.name, brand);
    database.responses.set(brand.name, []);

    return [201, "Brand created"];
});


export const brand_handlers = [
    get_brand, post_brand
]


