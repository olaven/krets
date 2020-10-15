import { FORBIDDEN, NOT_FOUND, OK, NO_CONTENT } from "node-kall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withCors, withAuthentication, withMethodHandlers, asAdmin } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { database } from "../../../database/database";
import { getPathParam } from "../../../workarounds";
import { deleteAuthUser } from "../../../auth/delete";
import { UserModel } from "../../../models/models";


const asSameUser = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user } = await auth0.getSession(request);

        return user.sub !== getPathParam(request.url, 1) ?
            response
                .status(FORBIDDEN)
                .send(null) :
            await handler(request, response);
    }

const getUser = asSameUser(
    async (request, response) => {

        const { user } = await auth0.getSession(request);
        const persistedUser = await database.users.getUser(user.sub);

        const [status, payload] = persistedUser ?
            [OK, persistedUser] :
            [NOT_FOUND, null]

        return response
            .status(status)
            .json(payload);
    });

/**
 * @param request 
 * @param response
 * DANGER: actually deletes everything related to the calling user  
 */
const deleteUser = asSameUser(
    async (request: NextApiRequest, response: NextApiResponse) => {

        const id = getPathParam(request.url, 1);
        const dbUser = await database.users.getUser(id);

        await deleteAuthUser(id);
        await database.users.deleteUser(id);

        response
            .status(NO_CONTENT)
            .end();
    });

const putUser = asAdmin(
    async (request, response) => {

        const user = request.body as UserModel;

        const existing = await database.users.getUser(user.id);
        if (!existing)
            return response
                .status(NOT_FOUND)
                .end();

        //THINKABOUT: separately to make it more explicit. Does this actually increase readability/security?
        if (user.role !== existing.role) {

            await database.users.updateRole(user);
        }

        await database.users.updateUser(user);

        response
            .status(NO_CONTENT)
            .end()
    });

export default withAuthentication(
    withCors(
        withMethodHandlers({
            GET: getUser,
            DELETE: deleteUser,
            PUT: putUser
        })
    )
);