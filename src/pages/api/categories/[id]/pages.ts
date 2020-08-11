//import { useRouter } from "next/router";
import auth0 from "../../../../auth/auth0";
import { pages } from "../../../../../src/database/pages"
import { OK } from "node-kall";
import { withCors } from "../../../../middleware/withCors";
import { withAuthentication } from "../../../../middleware/withAuthentication";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];
};

export default withCors(
    withAuthentication(async function categoryPagesHandler(request, response) {

        const { user } = await auth0.getSession(request);
        const id = getId(request.url); //useRouter().query.id as string

        const retrieved = await pages.getByOwnerAndCategory(user.sub, id)
        response
            .status(OK)
            .send(retrieved);
    })
);  