import auth0 from '../../../auth/auth0';
import { users } from "../../../database/database";
import { AuthModel } from '../../../models/models';
import { withCors, withErrorHandling } from '../../../middleware/middleware';


//TODO: Refactor: this function is messy and does several things
const createIfNotPresent = async ({ sub, email }: AuthModel) => {

  const user = await users.getUser(sub);
  if (!user) {
    await users.createUser({ id: sub });
  }
};

export default withCors(
  withErrorHandling(
    (async (req, res) => {
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
    })
  )
);