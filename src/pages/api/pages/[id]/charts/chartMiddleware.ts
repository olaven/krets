import { NextApiHandler } from "next";
import { withErrorHandling, withCors, withAuthentication, asPageOwner, withMethodHandlers } from "../../../../../middleware/middleware";
import { getPathParam } from "../../../../../workarounds";

export const getId = (url: string) => getPathParam(url, 3);

export const withChartMiddleware = (handler: NextApiHandler) =>
    withErrorHandling(
        withCors(
            withAuthentication(
                //NOTE: crucial middleware here, making sure user is authorized to access data
                asPageOwner(
                    (url) => getPathParam(url, 3),
                    withMethodHandlers({
                        GET: handler
                    })
                )
            )
        )
    );
