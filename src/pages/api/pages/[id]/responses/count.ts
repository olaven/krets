import { responses } from "../../../../../database/database"
import { asPageOwner, withAuthentication, withCors, withMethodHandlers, withMethods } from "../../../../../middleware/middleware"
import { getPathParam } from "../../../../../workarounds";

export default
    withCors(
        withAuthentication(
            asPageOwner(
                url => getPathParam(url, 3),
                withMethodHandlers({
                    GET: async (request, response) => {

                        const pageId = getPathParam(request.url, 3);
                        const count = await responses.getCount(pageId);

                        return response
                            .json({ count });
                    }
                })
            )
        )
    )
