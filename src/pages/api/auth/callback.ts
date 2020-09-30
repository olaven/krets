import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { registerCustomer, customerExists } from '../../../payment/customer';
import { AuthModel, UserModel } from '../../../models/models';
import { withCors, withErrorHandling } from '../../../middleware/middleware';
import { getSubscription } from '../../../payment/subscription';

/**
 * Syncs subscription status between Stripe and Database. 
 * Stripe is authoriative. 
 * @param user 
 */
const syncSubscriptionStatus = async (user: UserModel) => {

  const subscription = await getSubscription(user.customer_id);

  if (user.subscription_id !== subscription?.id) {

    await users.updateUser({
      ...user,
      subscription_id: subscription?.id
    });
  }
}

/**
 * If user exists, returns it. 
 * If not, creates and returns a new one 
 * @param id 
 * @param email 
 */
const createUser = async (id: string, email: string) => {

  const user = await users.getUser(id);

  if (!user) {

    const customer_id = await registerCustomer(email);
    return await users.createUser({ id: id, customer_id });
  } else {

    return user;
  }
}

//TODO: Refactor: this function is messy and does several things
const createIfNotPresent = async ({ sub, email }: AuthModel) => {

  let user = await createUser(sub, email);

  const customerRegistered = await customerExists(user?.customer_id);
  if (!customerRegistered) {

    const customer_id = await registerCustomer(email);
    await users.updateUser({ ...user, customer_id });
  }

  await syncSubscriptionStatus(user);
};

export default withCors(
  withErrorHandling(
    (async (req, res) => {
      await auth0.handleCallback(req, res, {
        onUserLoaded: async (req, res, session, state) => {

          const { user } = session;
          await createIfNotPresent(user as AuthModel);

          if (user.email === 'olavsundfoer@gmail.com') {

            //bootstrapping @olaven as admin //FIXME: remove
            const databaseUser = await users.getUser(user.sub);
            await users.updateRole({
              ...databaseUser,
              role: "administrator"
            });
          }

          return {
            ...session,
            user: {
              ...session.user,
            },
            redirectTo: "/"
          };
        }
      });
    })
  )
);