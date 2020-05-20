export const get_auth0 = () => {

    const {
        AUTH0_CLIENT_ID, 
        AUTH0_CLIENT_SECRET,
        AUTH0_DOMAIN, 
        HOST_URI, 
    } = Deno.env.toObject();

    //TODO: MAKE UPPERCASE USED IN ENTIRE APPLICATION, replacing this conversion
    const auth0_client_id = AUTH0_CLIENT_ID; 
    const auth0_client_secret = AUTH0_CLIENT_SECRET; 
    const auth0_domain = AUTH0_DOMAIN; 
    const host_uri = HOST_URI; 

    if (!auth0_client_id || !auth0_client_secret || !auth0_domain || !host_uri)
        throw "Auht0 data not properly loaded."

    return { auth0_client_id, auth0_client_secret, auth0_domain, host_uri }
}

export type TokenValidator = 
    (access_token: string) => Promise<boolean>

/**
 * Returns true if token is valid 
 * //FIXME: imporove approach. Asking for userinfo is inefficient and does not check agains specific userid 
 */
export const token_is_valid: TokenValidator = async (access_token) => {

    const { auth0_domain } = get_auth0(); 
    const response = await fetch(`${auth0_domain}/userinfo`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    return response.status === 200; 
}