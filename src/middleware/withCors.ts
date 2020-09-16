import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from 'micro-cors'

const cors = Cors({
    origin: process.env.NODE_ENV === "production" ?
        "https://krets.app" :
        "localhost"
});

/* 
NOTE: relevant when using custom origins, i.e. when implementing embed feature
const originCors = (origin: string) =>
    (handler: NextApiHandler) =>
        Cors({
            origin: origin
        })(handler);

const TestHandler = (requet: NextApiRequest, response: NextApiResponse) => {

    //get embed id fro mrequest somehow 
    const embedId = "something";
    const expectedOrigin = "read expected origin fro mdatabase";
    return originCors(expectedOrigin);
}


 */

export const withCors = (handler: NextApiHandler) =>
    cors(handler)