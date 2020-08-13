import randomColor from "randomcolor"
import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/database";
import { CREATED, OK, CONFLICT } from "node-kall";
import { PageModel } from "../../../models";
import { NextApiResponse, NextApiRequest } from "next";
import { withCors, withAuthentication, withErrorHandling } from "../../../middleware/middleware";

const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);

    const pagesInDatabase = await pages.getByOwner(user.sub);

    response
        .status(OK)
        .json(pagesInDatabase);
}

const post = withErrorHandling(
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user } = await auth0.getSession(request);

        const page = request.body as PageModel;
        page.owner_id = user.sub;
        page.color = randomColor();

        const exists = await pages.pageExists(page.id);
        const [status, body] = exists ?
            [CONFLICT, null] :
            [CREATED, await pages.createPage(page)]

        response
            .status(status)
            .send(body)
    }
);


export default withCors(
    withAuthentication(async (request, response) => {

        if (request.method === "GET") {

            get(request, response);
        } else if (request.method === "POST") {

            post(request, response);
        }
    })
);

