import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../../auth0"


const login = async (request: NextApiRequest, response: NextApiResponse) => {

    try {
        await auth0.handleLogin(request, response);
    } catch (error) {

        console.error(error);
        response.status(error.status || 400).end(error.message);
    }
};

export default login;

