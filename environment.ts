import { decode } from "./deps.ts";

/**
 * TODO: I'm pretty sure that this would be 
 * nice as a separate module :-) 
 */

const read_file = async (path: string): Promise<string> => {
    const data = await Deno.readFile(path);
    return decode(data);
};

const get_pairs = (raw_text: string) => raw_text
    .split("\n")
    .map(line => line.split("="))

const read_pair = async (path: string, action: (pair: [string, string]) => any) => {

    const file_content = await read_file(path);
    get_pairs(file_content)
        .map(pair => pair as [string, string])
        .forEach(action)
}

/**
 * Loads .env into Deno.env
 */
export const load_environment = async (path: string = `./.env`) => 
    read_pair(path, ([key, value]) => {
        Deno.env.set(key, value);
    });

/**
 * Clears environment of 
 * variables in .env
 */
export const clear_environment = (path: string = `./.env`) => 
    read_pair(path, ([key, _]) => {
        Deno.env.set(key, "");
    });