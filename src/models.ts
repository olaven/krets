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
    created_at?: string
}

//From DB 
export interface UserModel {
    id: string
}

//from Auth0
export interface AuthModel {
    name: string,
    sub: string
}