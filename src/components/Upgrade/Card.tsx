import React, { useState, useContext } from 'react';
import { CREATED } from "node-kall"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Box, Flex, Button, Text } from 'rebass';
import './Card.module.css'
import { StripeError } from '@stripe/stripe-js';
import { postSubscription } from '../../fetchers';
import { PaymentRequestModel } from '../../models';
import { UserContext } from '../../context/UserContext';


export function Card() {

    const [error, setError] = useState<StripeError>(null);

    const { databaseUser } = useContext(UserContext);

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

    const createSubscription = (paymentRequest: PaymentRequestModel) =>
        withStripeErrorHandling(async () => {

            const [status, subscription] = await postSubscription(paymentRequest)
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
        } else {

            await createSubscription({
                customerId: databaseUser.customer_id,
                paymentMethodId: paymentMethod.id,
                priceId: "SOME_MAGIC_PRICE_ID"
            })
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
