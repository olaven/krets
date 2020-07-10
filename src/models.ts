export type Emotion =
    ':-)' | ':-|' | ':-('

export interface ReseponseModel {
    id?: string,
    emotion: Emotion,
    text: string,
    page_id: string,
    created_at?: string,
}

export interface PageModel {
    id: string,
    name: string,
    owner_id: string,
    created_at?: string,
    category_id: string | null
}

export interface CategoryModel {
    id?: string,
    name: string
    owner_id: string,
    created_at?: string,
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