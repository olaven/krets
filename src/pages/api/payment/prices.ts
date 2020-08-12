import { OK, BAD_REQUEST } from "node-kall";
import { withCors } from "../../../middleware/withCors";
import { withMethods } from "../../../middleware/withMethods";
import { stripe } from "../../../payment/stripe";
import { withErrorHandling } from "../../../middleware/withErrorHandling";

export default withCors(
    withErrorHandling(
        withMethods(["GET"])(async (request, response) => {

            const productId = request.query.productId as string;
            if (!productId)
                return response
                    .status(BAD_REQUEST)
                    .send(null)

            //TODO: fetching things from Stripe should probably have its own internal module
            const prices = (await stripe.prices.list({
                product: productId
            })).data

            response
                .status(OK)
                .send(prices)
        })
    )
);