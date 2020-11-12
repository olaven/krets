import { FORBIDDEN, NOT_IMPLEMENTED } from "node-kall";
import { withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";


export default withErrorHandling(
    withMethodHandlers({
        GET: (request, response) => {

            const expected = process.env.EMAIL_SUMMARY_SECRET;
            const actual = request.headers["x-krets-email-summary-secret"];

            if (actual !== expected) {
                return response.status(FORBIDDEN).end();
            }

            return response.status(NOT_IMPLEMENTED).end();
        }
    })
)