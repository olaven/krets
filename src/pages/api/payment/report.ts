import { NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from "node-kall";
import { withCors, withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";

export default withCors(
    withErrorHandling(
        withMethodHandlers({
            POST: (request, response) => {

                const token = request.headers.authorization?.split(" ")[1]
                if (!token)
                    return response
                        .status(UNAUTHORIZED)
                        .end();
                if (token !== process.env.USAGE_REPORT_SECRET_TOKEN)
                    return response
                        .status(FORBIDDEN)
                        .end();


                //TODO: implement reporting 

                response
                    .status(NO_CONTENT)
                    .end()
            }
        })
    )
);