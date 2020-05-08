import { Brand, Response, User } from "./types.ts"

const users = new Map<string, User>();
const brands = new Map<string, Brand>()
const brand_to_response = new Map<string, Response[]>(); 

/**
 * Mock database before 
 * I get something "real"
 */
export const database = {
    users, brands, responses: brand_to_response
}
