import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {

    console.log("HIT SUCCEEDED HOOK");
    response.send("Succeeded responded");
}