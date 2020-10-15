import { NextApiRequest, NextApiResponse } from "next";
import { NOT_FOUND, BAD_REQUEST, CREATED } from "node-kall";
import { pages, responses } from "../../../../database/database";
import { withCors, withMethods, withMethodHandlers, withErrorHandling } from "../../../../middleware/middleware";
import { ResponseModel } from "../../../../models/models";
import { getPathParam, nullify } from "../../../../workarounds";


//TODO: auth protection? 
const getResponses = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 2);
    const requestKey = nullify(request.query.key as string);

    const page = await pages.getPage(id);

    if (!page)
        return response
            .status(NOT_FOUND)
            .send("No page found");


    const data = await responses.getResponses(id, {
        key: requestKey,
        amount: 10
    });

    const responseKey = data[data.length - 1]?.created_at;
    response.json({
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

        //TODO: remove explicit error handling, as `withErrorhandling` is applied 
        console.warn(error);
        res
            .status(BAD_REQUEST)
            .send("Invalid response")
    }
}


export default withCors(
    withErrorHandling(
        withMethods(["GET", "POST"])(
            withMethodHandlers({
                GET: getResponses,
                POST: postResponses
            })
        )
    )
);