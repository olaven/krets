import { first, rows, run } from "./helpers/helpers";
import { UserModel } from "../models/models";
import { pages } from "./database"
import { PaginationOptions } from "./helpers/PaginationOptions";

/*
//NOTE: only export to tests 
//TODO: Removed as part of Stripe removal - Remove Completely
const getUserCountWithSubscription = async () => {

   const result = await first<{ count: string }>(
      'select count(*) from users where subscription_id is not null', []
   )

   return parseInt(result.count);
} */

const getActiveUserCount = async () => {

   const result = await first<{ count: string }>(
      'select count(*) from users where active = true', []
   )

   return parseInt(result.count);
}

const getUser = (id: string) =>
   first<UserModel>(
      "select * from users where id = $1",
      [id]
   );

//TODO: Removed as part of Stripe removal - Remove Completely
/* const getUserByCustomerId = (customerId: string) =>
   first<UserModel>(
      `select * from users where customer_id = $1`,
      [customerId]
   ); */

/**
 * DANGER: returns user data that must _not_ be exposed other than to administrators
 * @param options 
 */
export const getAllUsers = (options: PaginationOptions = { amount: 10 }) =>
   options.key ?
      rows<UserModel>(
         `
            select * from users 
            where created_at < $2 
            order by created_at desc
            limit $1
         `,
         [options.amount, options.key]
      ) :
      rows<UserModel>(
         `
            select * from users
            order by created_at desc
            limit $1
         `,
         [options.amount]
      );


/**
 * Persists a new user. 
 * The supplied ID must match the Auth0-ID.
 * @param user 
 */
const createUser = (user: UserModel) =>
   first<UserModel>(
      "insert into users(id) values($1) RETURNING *",
      [user.id] //NOTE: passed explicity, as it needs to mirror Auth0
   );

const updateUser = (user: UserModel) =>
   first<UserModel>(
      `update users set active = $2 where id = $1 returning * `,
      [user.id, user.active]
   );

const updateRole = (user: UserModel) =>
   first<UserModel>(
      `update users set role = $2 where id = $1 returning * `,
      [user.id, user.role]
   );

/**
 * Added this in order to avoid 
 * fetchin databaseuser in subscription.ts
 */
//TODO: Commented as part of stripe removal -> remove completely.
/* const updatePaymentInformation =
   ({ id, subscription_id, product_id, invoice_paid }: { id: string, subscription_id: String, product_id: string, invoice_paid: boolean }) =>
      first<UserModel>(
         "update users set subscription_id = $2, product_id = $3, invoice_paid = $4 where id = $1 returning *",
         [id, subscription_id, product_id, invoice_paid]
      );


const updateInvoicePaid = (userId: string, invoicePaid: boolean) =>
   first<UserModel>(
      `update users set invoice_paid = $2 where id = $1 returning * `,
      [userId, invoicePaid]
   );
 */

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
   //FIXME: either through cascade (scary..) or through more complex with-queries (safer -> see beginning in `_deleteUser`). 
   const pagesOwnedByUser = await pages.getByOwner(id);
   for (const page of pagesOwnedByUser) {

      await pages.deletePage(page.id);
   }
   //TODO: crashes in test 
   await run(
      `delete from users where id = $1`,
      [id]
   );
}

//NOTE: this contains syntax errors, but something like this should replace `deleteUser` for performance reasons 
const _deleteUser = (id: string) => run(
   `
      WITH pages_owned_by_user AS(
            select * from pages 
         where owner_id = $1
         )
      WITH questions_in_pages as (
         select * from questions 
         where page_id in pages_owned_by_user
      )
      WITH answers_on_questions as (
   DELETE FROM answers
WHERE question_id IN(
   SELECT id FROM questions_in_pages
)
      )
DELETE FROM questions
WHERE id IN(
   SELECT id from questions_in_pages
)
DELETE FROM pages
WHERE id IN(
   SELECT id FROM pages_owned_by_user
)
   `,
   [id]
)



export const users = ({
   getUser,
   getAllUsers,
   createUser,
   updateUser,
   updateRole,
   userExists,
   deleteUser,
   getActiveUserCount
});