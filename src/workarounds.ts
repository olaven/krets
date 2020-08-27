import querystring from "querystring"

//FIXME: sort out test setup (as per below link) in order to remove the need for this workaround.
//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
export const getPathParam = (url: string, splitAt: number) => {

    const split = url.split("/");
    const param = split[split.length - splitAt];
    return decodeURIComponent(param)
};


//NOTE: same kind of workaround as `getId`
//FIXME: super-naive. Update once tests are fixed as per #161
export const getKey = (url: string) => {
    const parsed = querystring.decode(url.split("?")[1]);
    return parsed.key === "null" ?
        null :
        parsed.key
}
