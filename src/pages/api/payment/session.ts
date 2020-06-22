import * as s from "stripe"; 
const stripe = s("MY_API_KEY") 

export default = async (request, response) => {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: '{{PRICE_ID}}',
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',
    });

    response.json(session)
}