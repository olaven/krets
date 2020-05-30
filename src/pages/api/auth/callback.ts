import auth0 from '../../../auth/auth0';
import Database from "../../../database/Database";
import { repositories } from "../../../database/repository";


const createIfNotPresent = async (id: string) => {

  const connection = await Database.get();
  const repository = repositories(connection).user;

  console.log("THis is repository: ", repository);
  /*const repository = (await Database.get()).getRepository(UserEntity);
  const user = { id };

  const count = await repository.createQueryBuilder("user")
      .where("user.id = :id", {id})
      .getCount();

  if (count <= 0) {
    await repository.save(user);
  }*/
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