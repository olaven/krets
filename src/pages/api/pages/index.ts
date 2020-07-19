import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/pages";
import { CREATED, OK, NOT_IMPLEMENTED } from "../../../http/codes";
import { PageModel } from "../../../models";
import { NextApiRequest, NextApiResponse } from "next";


const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const pagesInDatabase = await pages.getByOwner(user.sub);

    response
        .status(OK)
        .json(pagesInDatabase);
}

const post = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);

    //NOTE: automatically set page owner
    const page = request.body as PageModel;
    page.owner_id = user.sub;

    try {

        const result = await pages.createPage(page);

        response
            .status(CREATED)
            .json(result)
    } catch (error) {

        console.log("PageId iwht error: ", page, "error", error);
        throw error
    }
}

export default auth0.requireAuthentication(async function brand(request, response) {

    const { user } = await auth0.getSession(request);

    if (request.method === "GET") {


        await get(request, response);
    } else if (request.method === "POST") {

        await post(request, response);
    }
});

