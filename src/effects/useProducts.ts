import { useState, useEffect } from "react";
import { Stripe } from "stripe";
import { OK } from "node-kall";
import { getProducts } from "../fetchers";
import { asyncEffect } from "./asyncEffect";


export const useProducts = () => {

    const [products, setProducts] = useState<Stripe.Product[]>([]);

    asyncEffect(async () => {

        const [status, products] = await getProducts();
        setProducts(status === OK ?
            products : []);
        setProducts(products);
    }, []);

    return products;
}