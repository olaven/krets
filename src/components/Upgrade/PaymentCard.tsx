import React, { useState, useContext } from 'react';
import { CREATED } from "node-kall"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Button, Text } from 'rebass';
import './PaymentCard.module.css'
import { StripeError } from '@stripe/stripe-js';
import { postSubscription } from '../../fetchers';
import { PaymentRequestModel } from '../../models';
import { UserContext } from '../../context/UserContext';
import * as text from "../../text";
import { Thanks } from '../tiny/Thanks';


type Props = { priceId: string }
export function PaymentCard({ priceId }: Props) {

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
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

            const [status] = await postSubscription(paymentRequest)

            setLoading(false);
            setSuccess(status === CREATED);
            if (status !== CREATED)
                console.error("status when creating subscription:", status);
        })

    const onPay = async () => {

        setLoading(true);
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

    return success ?
        <Thanks /> :
        <>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '26px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {loading ?
                <Text>{text.upgrade.loading}</Text> :
                <Button width={[1]} onClick={onPay}>{text.upgrade.pay}</Button>}
            {error && <Text color="failure">{error.message}</Text>}
        </>;
};
