import React, { useState, useEffect } from "react";
import { Stripe } from "stripe";
import { OK } from "node-kall";
import { getProducts } from "../fetchers";

// TODO: Give this a more suitable home and reuse it 
export const asyncEffect = (action: () => Promise<any>, on: any[]) =>
    useEffect(() => {
        action()
    }, on);

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