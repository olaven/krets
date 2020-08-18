//From DB 
export interface UserModel {
    id: string,
    customer_id: string,
    subscription_id?: string,
    product_id?: string,
    free_premium?: boolean,
    invoice_paid?: boolean
}
