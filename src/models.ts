export type Emotion = 
    ':-)' | ':-|' | ':-('

export interface ReseponseModel {
    id: string, 
    emotion: Emotion, 
    text: string, 
    page_id: string,
    created_at?: string, 
}

export interface PageModel {
    id: string, 
    name: string, 
    owner_id: string, 
    created_at?: string
}

//from Auth0
export interface AuthModel { 
    name: string,
    sub: string 
}