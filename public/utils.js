/**
 * Fetch wrapper only running in browser  
 * @param {string} url 
 * @param {*} options 
 */
export const http = async (url, options) => 
    typeof Deno !== 'undefined'?
        (url, options) => {/*Intentionally blank*/}: 
        fetch(url, options); 


export const post = async (url, body) => http(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    }, 
    body: JSON.stringify(body)
});

export const get = (url) => http(url, {});

