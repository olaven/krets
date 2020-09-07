import { NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from "node-kall";
import { withCors, withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { reportUsage } from "../../../payment/report";

export default withCors(
    withErrorHandling(
        withMethodHandlers({
            POST: async (request, response) => {

                const token = request.headers.authorization?.split(" ")[1]
                if (!token)
                    return response
                        .status(UNAUTHORIZED)
                        .end();
                if (token !== process.env.USAGE_REPORT_SECRET_TOKEN)
                    return response
                        .status(FORBIDDEN)
                        .end();

                await reportUsage()

                response
                    .status(NO_CONTENT)
                    .end()
            }
        })
    )
);