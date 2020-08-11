import React from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

import './Card.module.css'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

export function Card() {

    const elements = useElements();
    const cardElement = elements.getElement(CardElement);



    return (
        <label>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    );
};
