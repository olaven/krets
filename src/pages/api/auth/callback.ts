import auth0 from '../../../auth/auth0';
import {users} from "../../../database/users";


const createIfNotPresent = async (id: string) => {

  const user = await users.getUser(id);

  if (!user) {

    await users.createUser({id});
  }
};

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        
        const { user } = session;


        await createIfNotPresent(user.sub);

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

    res.status(error.status || 400).end(error.message);
  }
}