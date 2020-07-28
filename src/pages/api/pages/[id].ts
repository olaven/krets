import auth0 from "../../../auth/auth0";
import { pages } from "../../../database/pages";
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, NOT_IMPLEMENTED, FORBIDDEN, NO_CONTENT } from "node-kall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PageModel } from "../../../models";

export default function pageHandler(request: NextApiRequest, response: NextApiResponse) {

    const { method } = request;
    if (method === "GET") {

        get(request, response);
    } else if (method === "PUT") {

        put(request, response);
    } else if (method === "DELETE") {

        del(request, response);
    } else {

        response
            .status(BAD_REQUEST)
            .send("Method not supported")
    }
}

const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};

const del = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getId(request.url);
    const { user } = await auth0.getSession(request);

    if (!user.sub) {

        response
            .status(UNAUTHORIZED)
            .send("Not authenticated");
        return;
    }

    const page = await pages.getPage(id);
    if (page.owner_id !== user.sub) {

        response
            .status(FORBIDDEN)
            .send("Forbidden");
        return;
    }

    pages.deletePage(page.id);
    response
        .status(NO_CONTENT)
        .send("NO CONTENT");
}


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

const put = async (request, response) => {

    const page = request.body as PageModel;
    const { user } = await auth0.getSession(request);

    if (!user) {

        response
            .status(UNAUTHORIZED)
            .send("Not authenticated")
        return;
    }

    const pageFromDb = await pages.getPage(page.id)
    if (!pageFromDb) {

        response
            .status(NOT_FOUND)
            .send("Page was not found");
        return;
    }

    if (page.owner_id !== user.sub) {

        response
            .status(FORBIDDEN)
            .send("You do not own this page")
        return;
    }

    if (!page.name) {
        response
            .status(BAD_REQUEST)
            .send("name missing");
        return;
    }


    try {

        await pages.updatePage(page)
        response
            .status(NO_CONTENT)
            .send("")
    } catch (error) {

        response
            .status(BAD_REQUEST)
            .send("Page was not properly formatted")
    }
};
