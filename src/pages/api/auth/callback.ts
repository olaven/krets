import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { BAD_REQUEST } from 'node-kall';
import { registerCustomer } from '../../../payment/customer';
import { AuthModel } from '../../../models';
import { KretsCors } from '../../../middleware/KretsCors';

const createIfNotPresent = async ({ sub, email }: AuthModel) => {

  const user = await users.getUser(sub);
  if (!user) {

    const customer_id = await registerCustomer(email);
    await users.createUser({ id: sub, customer_id });
  }
  else if (user.customer_id === "default_customer_id") {
    //NOTE: "on demand migration" from old system where customer_id did not exist. TODO: migrate all existing users to some customer_id, remove default value on column and remove this code section
    const customer_id = await registerCustomer(email);
    await users.updateUser({
      id: sub, customer_id
    });
  }
};

export default KretsCors(async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {

        const { user } = session;


        //TODO: handle if user has default customer id. Or migrate every user. Not sure.
        await createIfNotPresent(user as AuthModel);

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
})