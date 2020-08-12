import React, { createContext, useState, useEffect } from "react";
import { Stripe } from "stripe";
import { OK } from "node-kall";
import { getProducts } from "../fetchers";



interface ContextInterface {
    stripe: Stripe,
    products: Stripe.Product[]
}

export const StripeContext = createContext<ContextInterface>({
    stripe: null,
    products: []
});


// TODO: Share if this works . FIXME: on-list does not work
const asyncEffect = (action: any, on: any[]) =>
    useEffect(() => {
        action()
    }, on);

export const StripeContextProvider = ({ publishableKey, children }) => {
    //TODO: remove stripe? 
    const [stripe, setStripe] = useState<Stripe>(null);
    const [products, setProducts] = useState<Stripe.Product[]>([]);


    useEffect(() => {
        (async () => {

            const [status, products] = await getProducts();
            setProducts(status === OK ?
                products : []);
            setProducts(products);
        })()
    }, []);

    /* useEffect(() => {
        (async () => {

            const stripe = await loadStripe(publishableKey);
            setStripe(stripe);
        })()
    }, []); */


    return <StripeContext.Provider value={{ stripe, products }}>
        {children}
    </StripeContext.Provider>
};

