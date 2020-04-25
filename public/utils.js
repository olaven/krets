/**
 * Fetch wrapper only running in browser  
 * @param {string} url 
 * @param {*} options 
 */
export const http = async (url, options) => 
    Deno? 
        null: 
        fetch(url, options)