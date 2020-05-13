import { get, post, contentType } from '../../../deps.ts';
import { not_found, conflict, error, ok } from "../http_responses.ts";
import { database } from '../database.ts';
import { Brand } from '../types.ts';

const get_brand = get("/api/brands/:name", ({ params }) => {

    const { name } = params; 
    const brand = database.brands.get(name); 

    if (brand) return [200, contentType("json"), JSON.stringify(brand)];
    return not_found()
});

const get_brand_by_owner = get("/api/brands", ({ params }) => {

    const { id } = params; 

    if (!id) 
        return error("Owner `id` was not specified in query string"); 

    //TODO: is user who they claim to be? (access token)

    //FIXME: obviously inefficient. Just for demo purposes now.
    const brands = Array.from(database.brands.values())
        .filter(brand => brand.owner_id === id);

    return ok(brands);
})

const post_brand = post("/api/brands", (context) => {

    const { body } = context;
    const brand = (JSON.parse(body)) as Brand;

    if (!brand.name)
        return error("Brand must have a name")
    if (database.brands.get(brand.name))
        return conflict("Brand already exists")

    database.brands.set(brand.name, brand);
    database.responses.set(brand.name, []);

    return [201, "Brand created"];
});


export const brand_handlers = () => [
    get_brand, post_brand
]


