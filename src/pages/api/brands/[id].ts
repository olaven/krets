import {NextApiRequest, NextApiResponse} from "next";

export default function specificBrand(request: NextApiRequest, response: NextApiResponse) {

    response.status(501).send("Not implemented");
}