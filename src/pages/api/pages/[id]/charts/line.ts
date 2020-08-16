import { FORBIDDEN } from "node-kall";
import { NextApiHandler } from "next";
import { withAuthentication, withCors, withErrorHandling, withMethodHandlers, withMethods } from "../../../../../middleware/middleware";
import { responses, pages } from '../../../../../database/database';
import auth0 from "../../../../../auth/auth0";

const withMiddleware = (handler: NextApiHandler) =>
    withErrorHandling(
        withCors(
            withAuthentication(
                withMethods(["GET"])(
                    handler
                )
            )
        )
    );


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 3];
};

export default withMiddleware(async (request, response) => {

    //const id = request.query.id as string;
    const id = getId(request.url);
    const { user } = await auth0.getSession(request);

    const page = await pages.getPage(id);
    if (page.owner_id !== user.sub)
        return response
            .status(FORBIDDEN)
            .send(null)

    const coordinates = await responses.getLineCoordinates(id);
    response
        .send(coordinates)
});