import { useState } from "react";
import Stripe from "stripe"
import { asyncEffect } from "./useProducts";

export const usePrices = (productId: string) => {

    const [prices, setPrices] = useState<Stripe.PricesResource>([])

    asyncEffect(async () => {


    }, [productId]);
}