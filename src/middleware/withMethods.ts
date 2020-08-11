import { BAD_REQUEST } from 'node-kall';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type Method = 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST' | 'OPTION' | 'HEAD'
//TODO: actually use :-D 
export const withMethods = (methods: Method[]) =>
    (handler: NextApiHandler) =>
        (request: NextApiRequest, response: NextApiResponse) => {

            const included = methods.includes(request.method as Method);
            included ?
                handler(request, response) :
                response
                    .status(BAD_REQUEST)
                    .send(null);
        }

/*
export const example =
    withMethods(["GET", "POST"])((request, response) => {

    })

export const chainedExample =
    withAuthentication(
        withCors(
            withMethods(['GET'])((request, response) => {

            })
        )
    ); */