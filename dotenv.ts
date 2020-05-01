import { decode } from "./deps.ts";

const read_file = async (path: string): Promise<string> => {
    const data = await Deno.readFile(path);
    return decode(data);
};

const get_pairs = (raw_text: string) => raw_text
    .split("\n")
    .map(line => line.split("="))

/**
 * Loads .env into Deno.env
 */
export const dotenv = async () => {

    const file_content = await read_file("./.env"); 
    get_pairs(file_content).forEach(pair => {

        const [key, value] = [pair[0], pair[1]];
        console.log("setting ", key, value)
        Deno.env.set(key, value);
    })
}