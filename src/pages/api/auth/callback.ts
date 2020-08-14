import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { registerCustomer, getCustomer } from '../../../payment/customer';
import { AuthModel } from '../../../models';
import { withCors, withErrorHandling } from '../../../middleware/middleware';
import { NextApiHandler } from 'next';


//TODO: Refactor: this function is messy and does several things
const createIfNotPresent = async ({ sub, email }: AuthModel) => {

  const user = await users.getUser(sub);
  if (!user) {

    const customer_id = await registerCustomer(email);
    await users.createUser({ id: sub, customer_id });
  }

  const customer = await getCustomer(user.customer_id);
  if (!customer) {

    const customer_id = await registerCustomer(email);
    await users.updateUser({ ...user, customer_id });
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