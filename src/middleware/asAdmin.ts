import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "node-kall";
import auth0 from "../auth/auth0";
import { users } from "../database/database";

export const asAdmin = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user: { sub } } = await auth0.getSession(request);
        const user = await users.getUser(sub);

        if (!user)
            return response
                .status(UNAUTHORIZED)
                .end();

        if (user.role !== "administrator")
            return response
                .status(FORBIDDEN)
                .end();

        return handler(request, response)
    }