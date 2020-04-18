import { Brand, Response } from "./types.ts"

const brands = new Map<string, Brand>()
const brand_to_response = new Map<string, Response[]>(); 

/**
 * Mock database before 
 * I get something "real"
 */
export const database = {
    brands, responses: brand_to_response
}

/* const brands: [string, Brand][] = []
const brand_to_response: [string, Response[]][] = [] */

/* export const database = {
    brands: {
        set: (name: string, brand: Brand) => {

            const index = brands.map(it => it[0]).findIndex(n => n === name); 
            if (index > -1)
                brands[index] = [name, brand]; 
            else 
                brands.push([name, brand])
        },
        get: (name: string) => 
            brands.find(it => it[0] === name)
    }, 
    responses: {
        set: (brand_name: string, responses: Response[]) => {

            const index = brand_to_response.map(it => it[0]).findIndex(n => n === brand_name); 
            if (index) 
                brand_to_response[index] = [brand_name, responses]
            else 
                brand_to_response.push([brand_name, responses])
        },
        get: (brand_name: string) => 
            brand_to_response.find(it => it[0] === brand_name)
    }
} */