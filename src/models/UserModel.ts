//From DB 
export type UserRole = "basic" | "administrator";
export interface UserModel {
    /**
     * ID of user - mirrors Auth0
     */
    id: string,
    /**
     * Wether a user has access to the platform or not.
     */
    active?: boolean,
    /**
     * The role of the user, i.e. 'basic' or 'administrator'
     */
    role?: UserRole,
    /**
     * When the user was created. 
     */
    created_at?: string,
}
