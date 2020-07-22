import { useRouter } from "next/router";
import auth0 from "../../../../../auth0";
import { pages } from "../../../../../src/database/pages"
import { OK } from "../../../../http/codes";


export default auth0.requireAuthentication(async (request, response) => {

    const { user } = await auth0.getSession(request);
    const id = useRouter().query.id as string

    const retrieved = pages.getByOwnerAndCategory(user.sub, id)
    response
        .status(OK)
        .send(retrieved);
});  