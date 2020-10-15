
//FIXME: sort out test setup (as per below link) in order to remove the need for this workaround.
//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
export const getPathParam = (url: string, splitAt: number) => {

    const split = url.split("/");
    const param = split[split.length - splitAt];
    return decodeURIComponent(param);
};


/**
 * Helper to convert between query string 'null' and js `null`
 * Useful as 'null' is truthy is JS, while we want 'null' to be falsy
 * @example const key = nullify(request.query.key) 
 * @param string if string is 'null', `null` is returned. Else, the string is returned
 */
export const nullify = (string: string) =>
    string === 'null' ?
        null :
        string

