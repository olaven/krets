//From DB 
export interface UserModel {
    id: string,
    active: boolean,

    //TODO: REMOVE BELOW WHEN HAVING INVOICE ONLY
    customer_id: string,
    subscription_id?: string,
    product_id?: string,
    invoice_paid?: boolean
}
