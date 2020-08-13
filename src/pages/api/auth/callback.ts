import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { registerCustomer } from '../../../payment/customer';
import { AuthModel } from '../../../models';
import { withCors, withErrorHandling } from '../../../middleware/middleware';
import { NextApiHandler } from 'next';

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

const withMiddleware = (handler: NextApiHandler) =>
  withCors(
    withErrorHandling(handler))

export default withMiddleware(async (req, res) => {
  await auth0.handleCallback(req, res, {
    onUserLoaded: async (req, res, session, state) => {

      const { user } = session;
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
});