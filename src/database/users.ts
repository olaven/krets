import {withDatabase} from "./connect";

const getUser = (id: string) => withDatabase(async client => {

   const result = await client.query("select * from users where id = $1", [id]);
   return result.rows[0];
});

const createUser = (user: {id: string}) => withDatabase(async client => {


   const result = await client.query("insert into users(id) values($1) RETURNING *", [user.id]);
   return result.rows[0];
});

const userExists = (id: string) => withDatabase(async client => {

   const result = await client.query(
       "select count(*) from users where id = $1",
       [id]);

   return result.rows[0].count == 1;
});

export const users = ({
   getUser, createUser, userExists
});