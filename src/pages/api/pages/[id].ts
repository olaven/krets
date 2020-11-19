
import { database } from "../../../database/database";
import { NOT_FOUND, BAD_REQUEST, NO_CONTENT } from "node-kall";
import { NextApiRequest, NextApiResponse } from "next";
import { PageModel } from "../../../models/models";
import { asPageOwner, withAuthentication, withCors, withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { getPathParam } from "../../../helpers/workarounds";
import auth0 from "../../../auth/__mocks__/auth0";



const getId = (url: string) => getPathParam(url, 1);


const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getId(request.url);
    const page = await database.pages.get(id);


    if (page) {

        response
            .json(page);
    } else {

        response
            .status(NOT_FOUND)
            .send("Could not find this brand..");
    }
}

const del = withAuthentication(
    asPageOwner(
        getId,
        async (request: NextApiRequest, response: NextApiResponse) => {

            const id = getId(request.url)
            database.pages._delete(id);

            response
                .status(NO_CONTENT)
                .send("NO CONTENT");
        }
    )
)



const put = withAuthentication(
    asPageOwner(
        getId,
        async (request, response) => {

            const page = request.body as PageModel;

            if (!page.name) {
                return response
                    .status(BAD_REQUEST)
                    .send("name missing");
            }

            const { user } = await auth0.getSession(request);
            if (page.category_id && !(await database.categories.hasOwner(user.sub, page.category_id)))
                return response
                    .status(BAD_REQUEST)
                    .end();

            await database.pages.update(page)
            response
                .status(NO_CONTENT)
                .send("");
        }
    )
);

export default withCors(
    withErrorHandling(
        withMethodHandlers({
            GET: get,
            PUT: put,
            DELETE: del
        })
    )
);
