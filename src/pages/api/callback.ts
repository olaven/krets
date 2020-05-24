import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../auth/auth0';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleCallback(req, res, {
      redirectTo: '/'
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}