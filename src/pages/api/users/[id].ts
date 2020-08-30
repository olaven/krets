import { FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import { withCors, withAuthentication, withMethods, withMethodHandlers } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";
import { getPathParam } from "../../../workarounds";
import { NextApiRequest, NextApiResponse } from "next";
import { response } from "../../../text";


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

const getAuth0Token = async () => {

    const form = new FormData();
    form.append("grant_type", "client_credentials");
    form.append("client_id", process.env.AUTH0_CLIENT_ID);
    form.append("client_secret", process.env.AUTH0_CLIENT_SECRET);
    form.append("audience", `${process.env.AUTH0_DOMAIN}/api/v2/`);

    const response = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: form
    });

    if (response.status === 201) {

        console.log(await response.json());
    } else {

        console.log(response);
    }
}

const deleteAuthUser = () => {

    const token = getAuth0Token();

}

const deleteUser = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 1)
    await deleteAuthUser()
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