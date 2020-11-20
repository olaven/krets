import { NOT_FOUND, OK, NO_CONTENT } from "node-kall";
import { NextApiRequest, NextApiResponse } from "next";
import { withCors, withAuthentication, withMethodHandlers, asAdmin, asSameUser } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { database } from "../../../database/database";
import { getPathParam } from "../../../helpers/workarounds";
import { deleteAuthUser } from "../../../auth/delete";
import { UserModel } from "../../../models/models";


const getId = (url: string) => getPathParam(url, 1);

const getUser = asSameUser(
    getId,
    async (request, response) => {

        const { user } = await auth0.getSession(request);
        const persistedUser = await database.users.get(user.sub);

        const [status, payload] = persistedUser ?
            [OK, persistedUser] :
            [NOT_FOUND, null]

        return response
            .status(status)
            .json(payload);
    },
);

/**
 * @param request 
 * @param response
 * DANGER: actually deletes everything related to the calling user  
 */
const deleteUser = asSameUser(
    getId,
    async (request: NextApiRequest, response: NextApiResponse) => {

        const id = getPathParam(request.url, 1);
        const dbUser = await database.users.get(id);

        await deleteAuthUser(id);
        await database.users.deleteUser(id);

        response
            .status(NO_CONTENT)
            .end();
    });

/**
 * A user may update data about themselves. 
 * Admin users may update any user. 
 * Admin users may also update `.role`. 
 */
const putUser = async (request: NextApiRequest, response: NextApiResponse) => {

    const user = request.body as UserModel;
    const claimsToBeAdmin = request.query.admin === "true";
    claimsToBeAdmin ?
        await asAdmin(
            async (req, res) => {

                const existing = await database.users.get(user.id);
                if (!existing)
                    return res
                        .status(NOT_FOUND)
                        .end();

                //NOTE: kind of wonky and inefficient.. But explicit and therefore harder to implement security mistakes. 
                await database.users.updateActive(user);
                await database.users.updateRole(user);
                await database.users.update(user);

                res
                    .status(NO_CONTENT)
                    .end();

            })(request, response) :
        await asSameUser(
            getId,
            async (req, res) => {

                await database.users.update(user);

                res
                    .status(NO_CONTENT)
                    .end()
            })(request, response);
};

export default withAuthentication(
    withCors(
        withMethodHandlers({
            GET: getUser,
            DELETE: deleteUser,
            PUT: putUser
        })
    )
);