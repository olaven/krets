import { FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import { withCors, withAuthentication, withMethods, withMethodHandlers } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";
import { getPathParam } from "../../../workarounds";
import { NextApiRequest, NextApiResponse } from "next";
import request from "request";


//THINKABOUT: how to structure helper-functions in this file better. In particular, all the code for getting auth0-acccess

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


const getAuth0Token = () => new Promise((resolve, reject) => {

    var options = {
        method: 'POST',
        url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
            client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        }
    };

    request(options, (error, response, body) => {

        if (error) reject(error);

        const json = JSON.parse(body)
        resolve(json.access_token);
    });
});


const deleteAuthUser = async (id: string) => {

    const token = await getAuth0Token();
    const { status, body } = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
        }
    });

    if (status !== 204) {
        throw `Error when deleting auth0 user, ${status} ${body}`;
    }
}

/**
 * 
 * @param request 
 * @param response
 * DANGER: actually deletes everything related to the calling user  
 */
const deleteUser = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 1);

    await deleteAuthUser(id);
    await users.deleteUser(id);

    response
        .status(204)
        .end();
};

export default withAuthentication(
    withCors(
        withMethodHandlers({
            GET: getUser,
            DELETE: deleteUser
        })
    )
);