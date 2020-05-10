export const get_auth0 = () => {

    const {
        auth0_client_id, 
        auth0_client_secret,
        auth0_domain, 
        host_uri, 
    } = Deno.env.toObject();

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