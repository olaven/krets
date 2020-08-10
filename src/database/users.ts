import { withDatabase } from "./connect";
import { UserModel } from "../models";

const getUser = (id: string) => withDatabase<UserModel>(async client => {

   const result = await client.query("select * from users where id = $1", [id]);
   return result.rows[0];
});

const createUser = (user: UserModel) => withDatabase<UserModel>(async client => {


   const result = await client.query("insert into users(id, customer_id) values($1, $2) RETURNING *", [user.id, user.customer_id]);
   return result.rows[0];
});

const userExists = (id: string) => withDatabase<boolean>(async client => {

   const result = await client.query(
      "select count(*) from users where id = $1",
      [id]);

   return result.rows[0].count == 1;
});

export const users = ({
   getUser, createUser, userExists
});