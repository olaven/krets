import { App, get, post, contentType } from 'https://denopkg.com/syumai/dinatra/mod.ts';

const get_brand = get("/api/brands/:name", ({ params }) => {

    //stuff.. 
    console.log("param name", params.name)
    return [200, contentType("json"), JSON.stringify({name: "testbrand"})]
});

const post_brand = post("/api/brands", () => {

    return [201, "created"]
});

const brand_endpoints = [
    get_brand, post_brand
]

export const handlers = [
    ...brand_endpoints
]


