import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import { KretsCors } from "../../../middleware/KretsCors";
import auth0 from "../../../auth/auth0";
import { users } from "../../../database/database";

const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};

export default KretsCors(
    auth0.requireAuthentication(async (request, response) => {


        if (request.method !== "GET") {
            response
                .status(BAD_REQUEST)
                .send(null);
            return;
        }

        const { user } = await auth0.getSession(request);
        const id = getId(request.url);

        if (user.sub !== id) {
            response
                .status(FORBIDDEN)
                .send(null);
            return
        }

        const persistedUser = await users.getUser(id);
        if (!persistedUser) {

            response
                .status(NOT_FOUND)
                .send(null);
        } else {

            response
                .status(OK)
                .send(persistedUser)
        }
    })
);