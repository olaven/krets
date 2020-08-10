import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { BAD_REQUEST } from 'node-kall';
import { registerCustomer } from '../../../payment/customer';

type SessionUser = { email: string, sub: string }

const createIfNotPresent = async ({ sub, email }: SessionUser) => {

  const user = await users.getUser(sub);

  if (!user) {

    const customer_id = await registerCustomer(email);
    await users.createUser({ id: sub, customer_id });
  }
};

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {

        console.log(session.user);
        const { user } = session;


        //TODO: handle if user has default customer id. Or migrate every user. Not sure.
        await createIfNotPresent(user as SessionUser);

        return {
          ...session,
          user: {
            ...session.user,
          },
          redirectTo: "/"
        };
      }
    });
  } catch (error) {

    res.status(error.status || BAD_REQUEST).end(error.message);
  }
}