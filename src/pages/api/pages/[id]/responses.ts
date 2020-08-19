import { NextApiRequest, NextApiResponse } from "next";
import { NOT_FOUND, BAD_REQUEST, CREATED } from "node-kall";
import { getKey } from "..";
import { pages, responses } from "../../../../database/database";
import { withCors, withMethods, withMethodHandlers } from "../../../../middleware/middleware";


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

const postResponses = async (request: NextApiRequest, response: NextApiResponse) => {

    const responseFromUser = request.body;

    try {

        const createdResponse = await responses.createResponse(responseFromUser);
        response
            .status(CREATED)
            .json(createdResponse);
    } catch (error) {

        //TODO: 400 or 500 based on error 
        console.warn(error);
        response
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