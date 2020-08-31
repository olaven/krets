import { first, run } from "./helpers/helpers";
import { UserModel } from "../models/models";
import { pages } from "./database"

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

/**
 * Added this in order to avoid 
 * fetchin databaseuser in subscription.ts
 */
const updatePaymentInformation =
   ({ id, subscription_id, product_id, invoice_paid }: { id: string, subscription_id: String, product_id: string, invoice_paid: boolean }) =>
      first<UserModel>(
         "update users set subscription_id = $2, product_id = $3, invoice_paid = $4 where id = $1 returning *",
         [id, subscription_id, product_id, invoice_paid]
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

/**
 * DANGER: permanently deletes given user record
 * and __all__ pages, repsonses, questions and answers, that are related. 
 */
const deleteUser = async (id: string) => {

   //FIXME: more performant by doing things inside queries instead of loading into memory like this
   //FIXME: either through cascade (scary..) or through more complex with-queries (safer). 
   const pagesOwnedByUser = await pages.getByOwner(id);
   for (const page of pagesOwnedByUser) {

      pages.deletePage(page.id);
   }
   //TODO: crashes in test 
   await run(
      `delete from users where id = $1`,
      [id]
   );
}



export const users = ({
   getUser,
   getUserByCustomerId,
   createUser,
   updateUser,
   updatePaymentInformation,
   updateInvoicePaid,
   userExists,
   deleteUser,
});