
//TODO: placeholder because query does not work in jest test (node env) https://github.com/vercel/next.js/issues/13505


import {pages} from "../../../database/pages";

const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};

export default async function pageHandler(request, response) {

    const id = getId(request.url);
    const page = await pages.getPage(id);


    if (page) {

        response
            .json(page);
    } else {

        response
            .status(404)
            .send("Could not find this brand..");
    }

}