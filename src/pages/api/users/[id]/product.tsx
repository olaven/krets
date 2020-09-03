import { NOT_FOUND } from "node-kall";
import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../../database/users";
import { withCors, withAuthentication, withMethodHandlers, withErrorHandling } from "../../../../middleware/middleware";
import { getPathParam } from "../../../../workarounds";
import { getProductBySubscription } from "../../../../payment/products";

const getProductByUser = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 2);
    const user = await users.getUser(id);

    if (!user.subscription_id)
        return response
            .status(NOT_FOUND)
            .end();

    const product = await getProductBySubscription(user.subscription_id);
    return response
        .json(product)
}

export default withCors(
    withAuthentication(
        withErrorHandling(
            withMethodHandlers({
                GET: getProductByUser
            })
        )
    )
);