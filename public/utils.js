/**
 * Fetch wrapper only running in browser  
 * @param {string} url 
 * @param {*} options 
 */
export const http = async (url, options) => 
    typeof Deno !== 'undefined'?
        null: 
        fetch(url, options)