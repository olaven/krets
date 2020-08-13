import { OK } from "node-kall";
//import { getProducts } from "../../../payment/products"; 
import { stripe } from "../../../payment/stripe"
import { withCors, withMethods, withErrorHandling } from "../../../middleware/middleware";

export default withCors(
    withErrorHandling(
        withMethods(["GET"])(async (request, response) => {

            const products = (await stripe.products.list()).data

            response
                .status(OK)
                .send(products)
        })
    )
);