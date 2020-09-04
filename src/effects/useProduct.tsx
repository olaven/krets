import { OK } from "node-kall";
import { useState } from "react";
import Stripe from "stripe";
import { getProductByUser } from "../fetchers";
import { asyncEffect } from "./asyncEffect"

export const useProduct = (userId: string) => {

    const [product, setProduct] = useState<Stripe.Product>(null);

    asyncEffect(async () => {

        if (!userId) return;

        const [status, product] = await getProductByUser(userId);
        if (status === OK)
            setProduct(product);
        else
            console.error(`${status} when fetching product..`);
    }, [userId]);

    return product;
}