import { get_auth0_env } from "./auth0.ts";

/**
 * Logs in with Auth0
 */
export const login = () => {

    const env = get_auth0_env()
    console.log(env)
}

/* GET https://YOUR_DOMAIN/authorize?
    response_type=code|token&
    client_id=YOUR_CLIENT_ID&
    connection=CONNECTION&
    redirect_uri=https://YOUR_APP/callback&
    state=STATE&
    ADDITIONAL_PARAMETERS */