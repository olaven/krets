/**
 * A response to a page 
 */
export interface Response extends Record<string, any> {
    indicator: 'smile' | 'neutral' | 'sad', 
    comment: string
}

/**
 * Representing a Krets-page 
 */
export interface Brand extends Record<string, any> {
    name: string, 
    owner: User
}

/**
 * Representing a user of the system. 
 * The actual user data is stored in Auth0. 
 */
export interface User extends Record<string, any> {
    id: string
}