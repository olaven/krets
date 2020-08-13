import React, { useState, useContext } from 'react';
import { CREATED } from "node-kall"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Box, Flex, Button, Text } from 'rebass';
import './PaymentCard.module.css'
import { StripeError } from '@stripe/stripe-js';
import { postSubscription } from '../../fetchers';
import { PaymentRequestModel } from '../../models';
import { UserContext } from '../../context/UserContext';


type Props = { priceId: string }
export function PaymentCard({ priceId }: Props) {

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

                console.log("Created a subscription", subscription);
            } else {

                console.error("status when creating subscription:", status);
            }
        })

    const onPay = async () => {

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (error) {
            setError(error);
        } else {

            setError(null);
            await createSubscription({
                customerId: databaseUser.customer_id,
                paymentMethodId: paymentMethod.id,
                priceId
            });
        }
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
