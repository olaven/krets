/**
 * Fetch wrapper only running in browser  
 * @param {string} url 
 * @param {*} options 
 */
const http_request = async (url, options) =>
    typeof Deno !== 'undefined' ?
    (url, options) => {
        /*Intentionally blank*/ } :
    fetch(url, options);

/**
 * POST request, only running in 
 * browser, not in Deno-server
 */
const post = async (url, body) => http_request(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
});

/**
 * GET request, only running in 
 * browser, not in Deno-server
 */
const get = (url, options = {}) => 
    http_request(url, options);


export const http = {
    get, post
}