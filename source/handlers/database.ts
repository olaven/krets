import { Brand, Response, User } from "./types.ts"

const users = new Map<string, User>();
const brands = new Map<string, Brand>()
const brand_to_response = new Map<string, Response[]>(); 

brands.set("test", {
    name: "test", 
    url_name: "test", 
    owner_id: "google-oauth2|103130415679943370506"
});

/**
 * Mock database before 
 * I get something "real"
 */
export const database = {
    users, brands, responses: brand_to_response
}
