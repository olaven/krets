import { Brand, Response } from "./types.ts"

const brands = new Map<string, Brand>()
const brand_to_response = new Map<string, Response[]>(); 

/**
 * Mock database before 
 * I get something "real"
 */
export const database = {
    brands: {
        set: (name: string, brand: Brand) => 
            brands.set(name, brand),
        get: (name: string) => 
            brands.get(name)
    }, 
    responses: {
        set: (brand_name: string, responses: Response[]) => 
            brand_to_response.set(brand_name, responses),
        get: (brand_name: string) => 
            brand_to_response.get(brand_name)
    }
}