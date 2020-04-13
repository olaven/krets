import { Brand, Response } from "./types.ts"

const brands = new Map<string, Brand>()
const responses = new Map<string, Response[]>(); 

/**
 * Mock database before 
 * I get something "real"
 */
export const database = {
    brands, responses
}