import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../auth/auth0';


export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {

        const { user } = session; 
        //TODO: store user in db, if user.sub is not already there

        return {
          ...session,
          user: {
            ...session.user,
            age: 20
          }, 
          redirectTo: "/"
        };
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}