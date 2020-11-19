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
    /**
     * At which email the use wants to be contacted, 
     * for instance with email summaries. 
     */
    contact_email?: string,
    /**
     * Wether the user wants to receive 
     * summary emails or not 
     */
    wants_email_summary?: boolean,
}
