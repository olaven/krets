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