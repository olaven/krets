import auth0 from "../../auth/auth0";

//TODO: I believe this is middleware. Investiage.
export default auth0.requireAuthentication(async function billingInfo(req, res) {

    const {
        user
    } = await auth0.getSession(req);
    res.json({
        email: user.email,
        country: 'United States',
        paymentMethod: 'Paypal'
    });
});