import { OK, BAD_REQUEST } from "node-kall";
import { withCors, withErrorHandling, withMethods } from "../../../middleware/middleware";
import { stripe } from "../../../payment/stripe";

export default withCors(
    withErrorHandling(
        withMethods(["GET"])(async (request, response) => {

            const productId = request.query.productId as string;
            if (!productId)
                return response
                    .status(BAD_REQUEST)
                    .send(null)

            //TODO: Move to internal stripe-module
            const prices = (await stripe.prices.list({
                product: productId,
                expand: ["data.tiers"]
            })).data.filter(price => price.active);

            response
                .status(OK)
                .send(prices)
        })
    )
);