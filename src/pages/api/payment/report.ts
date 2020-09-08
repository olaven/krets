import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NO_CONTENT, UNAUTHORIZED, FORBIDDEN } from "node-kall";
import { withCors, withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { reportUsage } from "../../../payment/report";

/**
 * Checks if the Bearer Token is the 
 * same as the expected secret. Returns 
 * the appropriate error response if that 
 * is not the case. Executes handler otherwise. 
 * 
 * @param handler 
 */
const withValidToken = (handler: NextApiHandler) =>
    (request: NextApiRequest, response: NextApiResponse) => {

        const token = request.headers.authorization?.split(" ")[1];
        if (!token)
            return response
                .status(UNAUTHORIZED)
                .end();

        if (token !== process.env.USAGE_REPORT_SECRET_TOKEN)
            return response
                .status(FORBIDDEN)
                .end();

        handler(request, response);
    }

export default withCors(
    withErrorHandling(
        //NOTE: 'withMiddelware' only calls subsequent handlers if the token is valid
        withValidToken(
            withMethodHandlers({
                POST: async (_, response) => {

                    await reportUsage();

                    response
                        .status(NO_CONTENT)
                        .end();
                }
            })
        )
    )
);