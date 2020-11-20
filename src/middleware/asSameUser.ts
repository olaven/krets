import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FORBIDDEN } from "node-kall";
import auth0 from "../auth/auth0";

export const asSameUser = (getId: (url: string) => string, handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user } = await auth0.getSession(request);

        return user.sub !== getId(request.url) ?
            response
                .status(FORBIDDEN)
                .send(null) :
            await handler(request, response);
    }