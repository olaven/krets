import { get_auth0 } from "./auth0.ts";

export const build_query = (config: any) => `?${Object.entries(config)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(`&`)}`;

/**
 * Logs in with Auth0
 */
export const login = async () => {

    const auth0 = get_auth0()
    
    const query_params = build_query({
        response_type: "code", 
        client_id: auth0.auth0_client_id, 
        connection: null, 
        redirect_uri: "https://localhost:8080/api/auth/callback", //TODO: some solution here
        state: null, 
    });
    
    const response = await fetch(`${auth0.auth0_domain}/authorize${query_params}`);
    console.log(await response.text())
    console.log("response; ", response)
    return response;
}

/* GET https://YOUR_DOMAIN/authorize?
    response_type=code|token&
    client_id=YOUR_CLIENT_ID&
    connection=CONNECTION&
    redirect_uri=https://YOUR_APP/callback&
    state=STATE&
    ADDITIONAL_PARAMETERS */