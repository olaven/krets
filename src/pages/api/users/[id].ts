import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import { withCors } from "../../../middleware/withCors";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";
import { withAuthentication } from "../../../middleware/withAuthentication";
import { withMethods } from "../../../middleware/withMethods";

//FIXME: is just a workaround, shared with pages/[id].ts. 
export const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};

export default withAuthentication(
    withCors(
        withMethods(["GET"])
            (async (request, response) => {

                const { user } = await auth0.getSession(request);

                if (user.sub !== getId(request.url))
                    return response
                        .status(FORBIDDEN)
                        .send(null);


                const persistedUser = await users.getUser(user.sub);
                const [status, payload] = persistedUser ?
                    [OK, persistedUser] :
                    [NOT_FOUND, null]

                return response
                    .status(status)
                    .send(payload)
            }))
);