import auth0 from "../../../auth/auth0";
import { CREATED, OK, FORBIDDEN, BAD_REQUEST } from "node-kall";
import { CategoryModel } from "../../../models";
import { NextApiRequest, NextApiResponse } from "next";
import { categories } from "../../../database/categories";


const get = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);

    const retrievedCategories = await categories.getByOwner(user.sub);
    response
        .status(OK)
        .send(retrievedCategories);
};


const post = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const category = request.body as CategoryModel;

    if (category.owner_id !== user.sub) {

        response
            .status(FORBIDDEN)
            .send("You don't own this category.");
        return;
    }

    try {

        const persisted = await categories.createCategory(category);
        response
            .status(CREATED)
            .send(persisted);
    } catch {

        response
            .status(BAD_REQUEST)
            .send("Malformed category.");
    }
};

export default auth0.requireAuthentication(async (request, response) => {

    if (request.method === "GET") {

        await get(request, response);
    } else if (request.method === "POST") {

        await post(request, response);
    }
});

