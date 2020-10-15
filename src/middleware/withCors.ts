import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * NOTE: 
 * Adapted from: https://github.com/possibilities/micro-cors/blob/master/src/index.js
 * With async handling, so errors are not swallowed anymore :-)
 */

const origin = process.env.NODE_ENV === "production" ?
    "https://krets.app" :
    "localhost"

const DEFAULT_ALLOW_METHODS = [
    'POST',
    'GET',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
]

const DEFAULT_ALLOW_HEADERS = [
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'X-HTTP-Method-Override',
    'Content-Type',
    'Authorization',
    'Accept'
]

const exposeHeaders = [];
const allowCredentials = true;

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 // 24 hours

export const withCors = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        response.setHeader("Access-Control-Allow-Origin", origin);
        //        response.setHeader('Access-Control-Allow-Origin', origin)
        if (allowCredentials) {
            response.setHeader('Access-Control-Allow-Credentials', 'true')
        }
        if (exposeHeaders.length) {
            response.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','))
        }


        if (request.method === "OPTIONS") {

            response.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOW_METHODS.join(','))
            response.setHeader('Access-Control-Allow-Headers', DEFAULT_ALLOW_HEADERS.join(','))
            response.setHeader('Access-Control-Max-Age', String(DEFAULT_MAX_AGE_SECONDS))
        }

        await handler(request, response)
    }
