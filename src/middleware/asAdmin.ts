import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FORBIDDEN } from "node-kall";
import auth0 from "../auth/auth0";
import { users } from "../database/database";

export const asAdmin = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user: { sub } } = await auth0.getSession(request);
        const user = await users.getUser(sub);

        return user?.role === "administrator" ?
            handler(request, response) :
            response
                .status(FORBIDDEN)
                .end();
    }