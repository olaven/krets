export type Emotion =
    ':-)' | ':-|' | ':-('

export interface ResponseModel {
    id?: string,
    emotion: Emotion,
    text: string,
    page_id: string,
    contact_details?: string,
    created_at?: string,
}

export interface PageModel {
    id: string,
    name: string,
    owner_id: string,
    created_at?: string,
    color?: string,
    category_id?: string
}

export interface CategoryModel {
    id?: string,
    name: string
    owner_id: string,
    created_at?: string,
}

//From DB 
export interface UserModel {
    id: string,
    customer_id: string,
    subscription_id?: string,
    product_id?: string,
    free_premium?: boolean,
    invoice_paid?: boolean
}

//from Auth0
export interface AuthModel {
    name: string,
    sub: string,
    email: string
}

export interface EmailModel {
    to?: string,
    from?: string,
    text: string
}


// Payment API 
export interface PaymentRequestModel {
    customerId: string,
    paymentMethodId: string,
    priceId: string
};