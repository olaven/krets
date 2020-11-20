import auth0 from '../../../auth/auth0';
import { database } from "../../../database/database";
import { AuthModel } from '../../../models/models';
import { withCors, withErrorHandling } from '../../../middleware/middleware';

const createIfNotPresent = async ({ sub, email }: AuthModel) => {

  const user = await database.users.get(sub);
  if (!user) {
    await database.users.create({
      id: sub,
      contact_email: email
    });
  }

  //NOTE: some users may have been registered before `contact_email` was implemented
  if (user && !user.contact_email) {

    await database.users.update({
      ...user,
      contact_email: email
    });
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
