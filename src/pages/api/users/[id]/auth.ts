import { NextApiHandler } from "next";
import { getAuthUser } from "../../../../auth/user";
import { withCors, asAdmin, withAuthentication, withMethodHandlers } from "../../../../middleware/middleware";
import { getPathParam } from "../../../../workarounds";

const applyMiddleware = (getHandler: NextApiHandler) =>
    withCors(
        withAuthentication(
            asAdmin(
                withMethodHandlers({
                    GET: getHandler
                })
            )
        )
    );

//HIGHLIGHT: important that this is only available to admins
export default applyMiddleware(
    async (request, response) => {

        const id = getPathParam(request.url, 2);
        const [status, authUser] = await getAuthUser(id);

        response
            .status(status)
            .send(authUser);
    });