import { first } from "./helpers/helpers";
import { UserModel } from "../models";

const getUser = (id: string) => first<UserModel>(
   "select * from users where id = $1",
   [id]
);

const getUserByCustomerId = (customerId: string) => first<UserModel>(
   `select * from users where customer_id = $1`,
   [customerId]
);

const createUser = (user: UserModel) => first<UserModel>(
   "insert into users(id, customer_id) values($1, $2) RETURNING *",
   [user.id, user.customer_id]
);

const updateUser = (user: UserModel) => first<UserModel>(
   "update users set customer_id = $2 where id = $1 returning *",
   [user.id, user.customer_id]
);

/**
 * Updates payment information for given user. 
 * 
 * //THINKABOUT: keeping this as a separate function for now, but that breaks with the established updateX-semantics. 
 * The idea is that I want to be super explicit when updating anything that has to do with payments. 
 */
const updatePaymentInformation = (user_id: string, product_id: string, subscription_id: string, invoice_paid: boolean) => first<UserModel>(
   "update users set product_id = $2, subscription_id = $3, invoice_paid = $4 where id = $1 returning *",
   [user_id, product_id, subscription_id, invoice_paid]
)

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
   updatePaymentInformation,
   userExists,
});