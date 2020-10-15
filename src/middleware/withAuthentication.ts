import auth0 from "../auth/auth0";
import { NextApiHandler, } from "next";

export const withAuthentication = (handler: NextApiHandler) =>
    auth0.requireAuthentication(async (request, response) => {

        await handler(request, response);
    }); 