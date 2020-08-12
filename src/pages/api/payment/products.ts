import { OK } from "node-kall";
//import { getProducts } from "../../../payment/products"; 
import { stripe } from "../../../payment/stripe"
import { withCors } from "../../../middleware/withCors";
import { withMethods } from "../../../middleware/withMethods";
import { withErrorHandling } from "../../../middleware/withErrorHandling";

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