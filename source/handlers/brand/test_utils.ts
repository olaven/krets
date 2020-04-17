import { Brand } from "../types.ts";
import { brand_handlers } from "./brand_handlers.ts";
import { with_app, test_get, test_post } from "../test_utils.ts";

export const with_brand_app = (action: (port: number) => any) => 
    with_app(brand_handlers, action)

export const fetch_brand = async (port: number, brand_name: string) => 
    test_get(`http://localhost:${port}/api/brands/${brand_name}`)

export const post_brand = async (port: number, brand: Brand) => 
    test_post(`http://localhost:${port}/api/brands`, brand)
