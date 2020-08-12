import { OK } from "node-kall";
import { useState } from "react";
import Stripe from "stripe"
import { asyncEffect } from "./useProducts";
import { getPrices } from "../fetchers";

export const usePrices = (productId: string) => {

    const [prices, setPrices] = useState<Stripe.Price[]>([])

    asyncEffect(async () => {

        const [status, prices] = await getPrices(productId);
        setPrices(status === OK ?
            prices :
            null
        );
    }, [productId]);

    return prices;
}