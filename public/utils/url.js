/**
 * Parses query after hash "#" in URL
 */
const parse_hash = () => {

    const parsed = {};
    location.hash.substring(1)
        .split("&")
        .map(pair => pair.split("="))
        .forEach(([key, value]) => {

            parsed[key] = value;
        });

    return parsed;
}

/**
 * Builds a query string with 
 * the same key-value as in given object
 */
const build_query = (config) => `?${Object.entries(config)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(`&`)}`;


export const url = {
    parse_hash, build_query
}