import {NextApiRequest, NextApiResponse} from "next";

export default function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    console.log("GOING TO FETCH RESPONSES");
    response.status(501).send("Not implemented");
}