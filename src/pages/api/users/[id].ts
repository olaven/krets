import { FORBIDDEN, NOT_FOUND, OK, NO_CONTENT } from "node-kall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withCors, withAuthentication, withMethodHandlers } from "../../../middleware/middleware";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";
import { getPathParam } from "../../../workarounds";
import { deleteCustomer } from "../../../payment/customer";
import { deleteAuthUser } from "../../../auth/delete";


const withSameUser = (handler: NextApiHandler) =>
    async (request: NextApiRequest, response: NextApiResponse) => {

        const { user } = await auth0.getSession(request);

        return user.sub !== getPathParam(request.url, 1) ?
            response
                .status(FORBIDDEN)
                .send(null) :
            handler(request, response);
    }

const getUser = async (request, response) => {

    const { user } = await auth0.getSession(request);
    const persistedUser = await users.getUser(user.sub);

    const [status, payload] = persistedUser ?
        [OK, persistedUser] :
        [NOT_FOUND, null]

    return response
        .status(status)
        .json(payload)
}


/**
 * @param request 
 * @param response
 * DANGER: actually deletes everything related to the calling user  
 */
const deleteUser = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 1);
    const dbUser = await users.getUser(id);

    await deleteAuthUser(id);
    await deleteCustomer(dbUser.customer_id);
    await users.deleteUser(id);

    response
        .status(NO_CONTENT)
        .end();
};

export default withAuthentication(
    withCors(
        withSameUser(
            withMethodHandlers({
                GET: getUser,
                DELETE: deleteUser
            })
        )
    )
);