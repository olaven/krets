import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FORBIDDEN, NOT_FOUND } from "node-kall";
import auth0 from "../auth/auth0";
import { database } from "../database/database";

//THINKABOUT: how to better solve the amount of dabase reads in this function 
export const asPageOwner = (extractPageId: (url: string) => string, handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const pageId = extractPageId(request.url);
        const { user } = await auth0.getSession(request);

        const page = await database.pages.get(pageId);

        if (!page)
            return response
                .status(NOT_FOUND)
                .end();

        if (page.owner_id !== user.sub)
            return response
                .status(FORBIDDEN)
                .end();

        await handler(request, response);
    }
