import auth0 from "../../../../auth/auth0";
import { database } from "../../../../../src/database/database"
import { OK } from "node-kall";
import { withCors, withAuthentication } from "../../../../middleware/middleware";
import { getPathParam } from "../../../../workarounds";


const getId = (url: string) => getPathParam(url, 2);

export default withCors(
    withAuthentication(async function categoryPagesHandler(request, response) {

        const { user } = await auth0.getSession(request);
        const id = getId(request.url);

        const retrieved = await database.pages.getByOwnerAndCategory(user.sub, id)
        response
            .status(OK)
            .send(retrieved);
    })
);  