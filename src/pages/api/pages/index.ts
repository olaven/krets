import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/database";
import { CREATED, OK } from "node-kall";
import { PageModel } from "../../../models";


export default auth0.requireAuthentication(async function pagesHandler(request, response) {

    const { user } = await auth0.getSession(request);

    if (request.method === "GET") {

        const pagesInDatabase = await pages.getByOwner(user.sub);

        response
            .status(OK)
            .json(pagesInDatabase);

    } else if (request.method === "POST") {

        //NOTE: automatically set page owner
        const page = request.body as PageModel;
        page.owner_id = user.sub;
        page.color = '#AABBCC'

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
});

