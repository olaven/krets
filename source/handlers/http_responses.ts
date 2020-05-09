import { contentType } from "../../deps.ts";


const basic_response = (code: number, message: string): [number, string] => 
    [code, message]

export const ok = <T> (payload: T): [number, { "Content-Type": string }, string] => 
    [200, contentType("json"), JSON.stringify(payload)]; 

export const not_found = (message = "Resource not found") => 
    basic_response(404, message)

export const error = (message = ""): [number, string] => 
    basic_response(400, message);

export const created = (message = "Created.") => 
    basic_response(201, message);

export const conflict = (message = "Conflicting resource") => 
    basic_response(409, message)

export const not_authorized = () => 
    basic_response(403, "Unauthorized");

export const not_authenticated = () => 
    basic_response(401, "Unauthenticated");