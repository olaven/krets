import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { initMiddleware } from "next/"
import Cors from 'cors'

//FIXME: does it acually do something? 
const cors = Cors({
    methods: ['HEAD'],
    origin: process.env.NODE_ENV === "production" ?
        "https://krets.app" :
        "localhost"
});


/* const runMiddleware = async (request, response, middleware) => {

    middleware(request, response, result => {
        if (result instanceof Error) {
            throw result;
        }
        return result;
    })
} */

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const KretsCors = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        await runMiddleware(request, response, cors);
        handler(request, response);
    }