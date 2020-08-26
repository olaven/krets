import { OK } from "node-kall";
import { getProducts } from "../../../payment/products";
import { withCors, withMethods, withErrorHandling } from "../../../middleware/middleware";

export default withCors(
    withErrorHandling(
        withMethods(["GET"])(async (request, response) => {

            const products = await getProducts();

            response
                .status(OK)
                .send(products)
        })
    )
);