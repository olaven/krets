import randomColor from "randomcolor"
import auth0 from "../../../auth/auth0";
import { database } from "../../../database/database";
import { CREATED, OK, CONFLICT } from "node-kall";
import { PageModel, PaginatedModel } from "../../../models/models";
import { NextApiResponse, NextApiRequest } from "next";
import { withCors, withAuthentication, withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";



const getPages = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const requestKey = request.query.key as string;

    const data = await database.pages.getByOwner(user.sub, {
        amount: 15,
        key: requestKey
    });

    const paginated: PaginatedModel<PageModel> = {
        data,
        next: `/api/pages?key=${data[data.length - 1]?.created_at}`
    }

    response
        .status(OK)
        .json(paginated);
}

const postPage = withErrorHandling(
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user } = await auth0.getSession(request);

        const page = request.body as PageModel;
        page.owner_id = user.sub;
        page.color = randomColor();

        const exists = await database.pages.pageExists(page.id);
        const [status, body] = exists ?
            [CONFLICT, null] :
            [CREATED, await database.pages.createPage(page)]

        response
            .status(status)
            .send(body)
    }
);


export default withCors(
    withAuthentication(
        withMethodHandlers({
            GET: getPages,
            POST: postPage
        })
    )
);

