import {NextApiRequest, NextApiResponse} from "next";

export default function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    response.status(501).send("Not implemented");
}