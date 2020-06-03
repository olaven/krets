import {NextApiRequest, NextApiResponse} from "next";
import {pages} from "../../../../database/pages";
import {responses} from "../../../../database/responses";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default async function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {


    const id = getId(request.url);
    const page = await pages.getPage(id);

    if (!page) {

        response
            .status(404)
            .send("No brand found");

        return;
    }

    const responseResult = await responses.getResponses(id);

    response
        .json(responseResult);
}