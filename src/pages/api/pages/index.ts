import randomColor from "randomcolor"
import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/database";
import { CREATED, OK, CONFLICT } from "node-kall";
import { PageModel, PaginatedModel } from "../../../models/models";
import { NextApiResponse, NextApiRequest } from "next";
import { withCors, withAuthentication, withErrorHandling } from "../../../middleware/middleware";
import querystring from "querystring";


//NOTE: same kind of workaround as `getId`
//FIXME: super-naive. Update once tests are fixed as per #161
export const getKey = (url: string) => {
    const parsed = querystring.decode(url.split("?")[1]);
    return parsed.key === "null" ?
        null :
        parsed.key
}

const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const requestKey = getKey(request.url) as string;

    const data = await pages.getByOwner(user.sub, {
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

