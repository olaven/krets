import auth0 from '../../../auth/auth0';
import { repositories } from "../../../database/remove_typeorm/repository";
import {connect} from "../../../database/remove_typeorm/Database";
import {users} from "../../../database/users";


const createIfNotPresent = async (id: string) => {

  /*const connection = await connect();
  const repository = await (await repositories(connection)).user;

  console.log("THis is repository: ", repository);

  const user = { id };

  const count = await repository.createQueryBuilder("user")
      .where("user.id = :id", {id})
      .getCount();*/

  const user = await users.getUser(id);

  console.log("Fetched user", user);
  if (!user) {
    await users.createUser({id});
    console.log("after: ");
    console.log((await users.getUser(id)))
    //await repository.save(user);
  }
};

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        
        const { user } = session;

        console.log("THis is the user", user);

//TODO: move back
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
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}