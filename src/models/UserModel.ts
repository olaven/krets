//From DB 
export type UserRole = "basic" | "administrator";
export interface UserModel {
    id: string,
    active?: boolean,
    role?: UserRole,
    created_at?: string,

    //TODO: REMOVE BELOW WHEN HAVING INVOICE ONLY
    customer_id: string,
    subscription_id?: string,
    product_id?: string,
    invoice_paid?: boolean
}
