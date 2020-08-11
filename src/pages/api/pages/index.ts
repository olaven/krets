import randomColor from "randomcolor"
import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/database";
import { CREATED, OK } from "node-kall";
import { PageModel } from "../../../models";
import { NextApiResponse, NextApiRequest } from "next";
import { KretsCors } from "../../../middleware/KretsCors";
import { withAuthentication } from "../../../middleware/withAuthentication";

const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);

    const pagesInDatabase = await pages.getByOwner(user.sub);

    response
        .status(OK)
        .json(pagesInDatabase);
}

const post = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);

    const page = request.body as PageModel;
    page.owner_id = user.sub;
    page.color = randomColor();

    try {

        const result = await pages.createPage(page);

        response
            .status(CREATED)
            .json(result)
    } catch (error) {

        console.log("Page with error: ", page, "error", error);
        throw error
    }

}


export default KretsCors(

    withAuthentication(async function pagesHandler(request, response) {

        if (request.method === "GET") {

            get(request, response);
        } else if (request.method === "POST") {

            post(request, response);
        }
    })
);

