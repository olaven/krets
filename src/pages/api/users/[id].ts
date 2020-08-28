import { FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import { withCors, withAuthentication, withMethods, withMethodHandlers } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";
import { getPathParam } from "../../../workarounds";
import { NextApiRequest, NextApiResponse } from "next";


const getUser = async (request, response) => {

    const { user } = await auth0.getSession(request);

    if (user.sub !== getPathParam(request.url, 1))
        return response
            .status(FORBIDDEN)
            .send(null);


    const persistedUser = await users.getUser(user.sub);
    const [status, payload] = persistedUser ?
        [OK, persistedUser] :
        [NOT_FOUND, null]

    return response
        .status(status)
        .json(payload)
}

const deleteUser = async (request: NextApiRequest, response: NextApiResponse) => {


    response.status(500).end();
};

export default withAuthentication(
    withCors(
        withMethodHandlers({
            GET: getUser,
            DELETE: deleteUser
        })
    )
);