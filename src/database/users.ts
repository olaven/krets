import { first } from "./helpers/helpers";
import { UserModel } from "../models";

const getUser = (id: string) => first<UserModel>(
   "select * from users where id = $1",
   [id]
);

const createUser = (user: UserModel) => first<UserModel>(
   "insert into users(id, customer_id) values($1, $2) RETURNING *",
   [user.id, user.customer_id]
)

const updateUser = (user: UserModel) => first<UserModel>(
   "update users set customer_id = $2 where id = $1 returning *",
   [user.id, user.customer_id]
)

const userExists = async (id: string) => {

   const result = await first<{ count: string }>(
      "select count(*) from users where id = $1",
      [id]
   );

   return result.count === '1';
};

export const users = ({
   getUser, createUser, updateUser, userExists
});