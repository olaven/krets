import auth0 from "../auth/auth0";
import { IApiRoute } from "@auth0/nextjs-auth0/dist/handlers/require-authentication";
import { NextApiHandler, } from "next";

export const withAuthentication = (handler: NextApiHandler) =>
    auth0.requireAuthentication(async (request, response) => {

        handler(request, response);
    }); 