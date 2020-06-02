import {withDatabase} from "./connect";

const getUser = (id: string) => withDatabase(async client => {

   const result = await client.query("select * from users where id = $1", [id]);
   return result.rows[0];
});

const createUser = (user: {id: string}) => withDatabase(async client => {

   try {

      const result = await client.query("insert into users(id) values($1)", [user.id]);
      return result;
   } catch (error) {
      throw error;
   }
});

export const users = ({
   getUser, createUser
});