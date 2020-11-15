import { first, rows, run } from "./helpers/helpers";
import { UserModel } from "../models/models";
import { database } from "./database"
import { PaginationOptions } from "./helpers/PaginationOptions";


export const getActiveUserCount = async () => {

   const result = await first<{ count: string }>(
      'select count(*) from users where active = true', []
   )

   return parseInt(result.count);
}

export const get = (id: string) =>
   first<UserModel>(
      "select * from users where id = $1",
      [id]
   );

/**
 * DANGER: returns user data that must _not_ be exposed other than to administrators
 * @param options 
 */
export const getAll = (options: PaginationOptions = { amount: 10 }) =>
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
export const create = (user: UserModel) =>
   first<UserModel>(
      "insert into users(id) values($1) RETURNING *",
      [user.id] //NOTE: passed explicity, as it needs to mirror Auth0
   );

export const update = (user: UserModel) =>
   first<UserModel>(
      `update users set contact_email = $2, wants_email_summary = $3 where id = $1 returning * `,
      [user.id, user.contact_email, user.wants_email_summary]
   );

export const updateActive = (user: UserModel) =>
   first<UserModel>(
      `update users set active = $2 where id = $1 returning * `,
      [user.id, user.active]
   );

export const updateRole = (user: UserModel) =>
   first<UserModel>(
      `update users set role = $2 where id = $1 returning * `,
      [user.id, user.role]
   );

export const exists = async (id: string) => {

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
export const deleteUser = async (id: string) => {

   //FIXME: more performant by doing things inside queries instead of loading into memory like this
   //FIXME: either through cascade (scary..) or through more complex with-queries (safer -> see beginning in `_deleteUser`). 
   const pagesOwnedByUser = await database.pages.getByOwner(id);
   for (const page of pagesOwnedByUser) {

      await database.pages._delete(page.id);
   }

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
