import { NextApiRequest, NextApiResponse } from "next";
import { NOT_FOUND, BAD_REQUEST, CREATED } from "node-kall";
import { pages, responses } from "../../../../database/database";
import { withCors, withMethods, withMethodHandlers } from "../../../../middleware/middleware";
import { ResponseModel } from "../../../../models/models";
import { getKey } from "../../../../workarounds";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];
};


//TODO: auth protection? 
const getResponses = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getId(request.url);
    const requestKey = getKey(request.url) as string;

    const page = await pages.getPage(id);

    if (!page) {

        response
            .status(NOT_FOUND)
            .send("No page found");

        return;
    }


    const data = await responses.getResponses(id, {
        key: requestKey,
        amount: 10
    });
    const responseKey = data[data.length - 1]?.created_at;

    response
        .json({
            data,
            next: `/api/pages/${page.id}/responses?key=${responseKey}`
        });
}

const postResponses = async (req: NextApiRequest, res: NextApiResponse) => {

    const response = req.body as ResponseModel;
    const page = await pages.getPage(response.page_id)

    if (page.mandatory_contact_details && !response.contact_details)
        return res
            .status(BAD_REQUEST)
            .end()

    try {

        const persisted = await responses.createResponse(response);
        res
            .status(CREATED)
            .json(persisted);
    } catch (error) {

        //TODO: 400 or 500 based on error 
        console.warn(error);
        res
            .status(BAD_REQUEST)
            .send("Invalid response")
    }
}


export default withCors(
    withMethods(["GET", "POST"])(
        withMethodHandlers({
            GET: getResponses,
            POST: postResponses
        })
    )
);