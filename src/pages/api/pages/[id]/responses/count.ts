import { actuallyOwns } from "./[responseId]/answers"
import { responses } from "../../../../../database/database"
import { withAuthentication, withCors, withMethodHandlers } from "../../../../../middleware/middleware"
import { getPathParam } from "../../../../../workarounds";

export default
    withCors(
        withAuthentication(
            actuallyOwns(
                withMethodHandlers({
                    GET: async (request, response) => {

                        const pageId = getPathParam(request.url, 3);
                        const count = await responses.getCount(pageId);

                        return response
                            .json({ count })
                    }
                })
            )
        )
    )
