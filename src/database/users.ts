import { first } from "./helpers/helpers";
import { UserModel } from "../models";

const getUser = (id: string) =>
   first<UserModel>(
      "select * from users where id = $1",
      [id]
   );

const getUserByCustomerId = (customerId: string) =>
   first<UserModel>(
      `select * from users where customer_id = $1`,
      [customerId]
   );

const createUser = (user: UserModel) =>
   first<UserModel>(
      "insert into users(id, customer_id) values($1, $2) RETURNING *",
      [user.id, user.customer_id]
   );

const updateUser = (user: UserModel) =>
   first<UserModel>(
      `update users set customer_id = $2, product_id = $3, subscription_id = $4 where id = $1 returning *`,
      [user.id, user.customer_id, user.product_id, user.subscription_id]
   );

const updateInvoicePaid = (userId: string, invoicePaid: boolean) =>
   first<UserModel>(
      `update users set invoice_paid = $2 where id = $1 returning *`,
      [userId, invoicePaid]
   );


const userExists = async (id: string) => {

   const result = await first<{ count: string }>(
      "select count(*) from users where id = $1",
      [id]
   );

   return result.count === '1';
};

export const users = ({
   getUser,
   getUserByCustomerId,
   createUser,
   updateUser,
   updateInvoicePaid,
   userExists,
});