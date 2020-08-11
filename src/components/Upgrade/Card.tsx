import React, { useState } from 'react';
import { CREATED } from "node-kall"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Box, Flex, Button, Text } from 'rebass';
import './Card.module.css'
import { StripeError } from '@stripe/stripe-js';


export function Card() {

    const [error, setError] = useState<StripeError>(null);

    const stripe = useStripe();
    const elements = useElements();



    const withStripeErrorHandling = async (action: () => Promise<any>) => {

        //NOTE: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
        const isStripeError = (error: any): error is StripeError =>
            (error as StripeError).payment_method !== undefined

        try {

            await action()
        } catch (error) {

            if (isStripeError(error))
                setError(error);
            else
                throw error
        }
    }

    const createSubscription = (customerId: string, paymentMethodId: string, priceId: string) =>
        withStripeErrorHandling(async () => {

            //@ts-ignore //TODO: implement
            const [status, subscription] = await postSubscription(customerId, paymentMethodId, priceId)
            if (status === CREATED) {

                console.log("Created a subscription");
            }
        })

    const onPay = async () => {

        console.log("on pay");
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (error) {
            setError(error);
            return;
        }

        console.error("error: ", error);
        console.info("paymentMethod: ", paymentMethod)
    }

    return <>
        <Box>
            <Box width={[1, 1 / 4]}>
                <CardElement />
            </Box>
            <Button width={[1, 1 / 4]} onClick={onPay}>Pay</Button>
            {error && <Text color="failure">{error.message}</Text>}
        </Box>
    </>
};
