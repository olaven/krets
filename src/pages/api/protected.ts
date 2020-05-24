import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from "../../auth/auth0";


export default auth0.requireAuthentication(async function protectedRoute(req, res) {
  const { user } = await auth0.getSession(req) as any;
  res.json({
    email: user.email,
    country: 'United States',
    paymentMethod: 'Paypal'
  });
});