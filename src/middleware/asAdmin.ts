import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FORBIDDEN, UNAUTHORIZED } from "node-kall";
import auth0 from "../auth/auth0";
import { database } from "../database/database";

export const asAdmin = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user: { sub } } = await auth0.getSession(request);
        const user = await database.users.get(sub);

        if (!user)
            return response
                .status(UNAUTHORIZED)
                .end();

        if (user.role !== "administrator")
            return response
                .status(FORBIDDEN)
                .end();

        await handler(request, response)
    }