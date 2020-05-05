import Layout from "./layout.js";
import { h, useState, useEffect } from "../deps_frontend.js"
import { get } from "../utils.js";

const build_query = (config) => `?${Object.entries(config)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(`&`)}`;

/**

    GET https: //YOUR_DOMAIN/authorize?
        audience = API_IDENTIFIER &
        scope = SCOPE &
        response_type = token | id_token | id_token token &
        client_id = YOUR_CLIENT_ID &
        redirect_uri = https: //YOUR_APP/callback&
        state = STATE &
        nonce = NONCE
 */


const Register = (props) => {

    const { auth0_client_id, auth0_domain, host_uri } = props; 
    const [ url, setUrl ] = useState("")

    useEffect(() => {

        const url = `https://krets.eu.auth0.com/login?client=${auth0_client_id}&redirect_uri=${host_uri}`;
        setUrl(url)
    }, [auth0_client_id, auth0_domain, host_uri])
    
    return h `<${Layout}>
        
        <a href=${url}>Login</a>
    </${Layout}>`
}


export default Register;