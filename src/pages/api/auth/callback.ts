import auth0 from '../../../auth/auth0';
import { repositories } from "../../../database/repository";
import {connect} from "../../../database/Database";


const createIfNotPresent = async (id: string) => {

  const connection = await connect();
  const repository = await (await repositories(connection)).user;

  console.log("THis is repository: ", repository);

  const user = { id };

  const count = await repository.createQueryBuilder("user")
      .where("user.id = :id", {id})
      .getCount();

  if (count <= 0) {
    await repository.save(user);
  }
};

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        
        const { user } = session;

        console.log("THis is the user", user);

        
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