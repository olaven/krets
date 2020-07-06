
//TODO: placeholder because query does not work in jest test (node env) https://github.com/vercel/next.js/issues/13505

import { pages } from "../../../database/pages";
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } from "../../../http/codes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PageModel } from "../../../models";
import auth0 from "../../../../auth0";

const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};


const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getId(request.url);
    const page = await pages.getPage(id);


    if (page) {

        response
            .json(page);
    } else {

        response
            .status(NOT_FOUND)
            .send("Could not find this brand..");
    }
}

const put = auth0.requireAuthentication(async (request, response) => {

    const page = request.body as PageModel;
    const { user } = await auth0.getSession(request);

    if (page.owner_id !== user.sub) {

        response
            .status(UNAUTHORIZED)
            .send("You do not own this page")
        return;
    }

    if (!page.name) {
        response
            .status(BAD_REQUEST)
            .send("name missing");
        return;
    }
}

    

export default function pageHandler(request: NextApiRequest, response: NextApiResponse) {


    const { method } = request;
    if (method === "GET") {

        get(request, response);
    } else if (method === "PUT") {

        put(request, response)
    } else {

        response
            .status(BAD_REQUEST)
            .send("Method not supported")
    }
}