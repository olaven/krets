import { CREATED, CONFLICT, OK, NOT_FOUND } from "node-kall";
import { PaymentRequestModel } from "../../../models/models";
import { withCors, withMethods, withErrorHandling, withAuthentication, withMethodHandlers } from "../../../middleware/middleware";
import { users } from "../../../database/users";
import auth0 from "../../../auth/auth0";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createSubscription, cancelSubscription, retrieveSubscription } from "../../../payment/subscription";



const updateDatabase = (user_id: string, subscription_id: string, product_id: string) => users.updatePaymentInformation({
    id: user_id,
    invoice_paid: true,
    subscription_id,
    product_id,
});


const postSubscription = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const { customerId, paymentMethodId, priceId } = request.body as PaymentRequestModel

    //NOTE: error handling should ideally return 402, but is now caught by generic errorHandling-middleware
    const [product_id, subscription_id] = await createSubscription(customerId, paymentMethodId, priceId);

    await updateDatabase(user.sub, subscription_id, product_id);

    response
        .status(CREATED)
        .send(`${subscription_id}`);
}

const deleteSubscription = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const dbUser = await users.getUser(user.sub);

    if (!dbUser?.subscription_id)
        return response
            .status(CONFLICT)
            .end();

    const subscription = await cancelSubscription(dbUser);
    await updateDatabase(user.sub, null, user.product_id);

    response
        .status(OK)
        .send(subscription);
}

const getSubscription = async (request: NextApiRequest, response: NextApiResponse) => {

    const { user } = await auth0.getSession(request);
    const dbUser = await users.getUser(user.sub);

    const subscription = await retrieveSubscription(dbUser);

    return subscription ?
        response
            .json(subscription) :
        response
            .status(NOT_FOUND)
            .end()

}

export default withCors(
    withErrorHandling(
        withAuthentication(
            withMethodHandlers({
                POST: postSubscription,
                DELETE: deleteSubscription,
                GET: getSubscription
            })
        )
    )
);