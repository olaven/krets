import Layout from "./layout.js";
import { h } from "../deps_frontend.js"
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

    const { auth0_client_id, auth0_domain } = props; 

    const onImplicit = async () => {

        const query = build_query({
            audience: `${auth0_domain}/api/v2`, 
            scope: "profile email", 
            response_type: "token", //required
            client_id: auth0_client_id,//required
            state: "test_state_krets",
            nonce: "nonce_value",
        })
        const response = await get(`${auth0_domain}/authorize${query}`); 

        console.log(response);

    }
    

    console.log(props);
    const onUniversal = async () => {

        /**
         GET https: //krets.eu.auth0.com/authorize?
            response_type = code | token &
            client_id = si4eE1tnSMdh0pwD4Rt6ZKPgLoqioxzG &
            connection = CONNECTION &
            redirect_uri = undefined &
            state = STATE
         */

        const query = build_query({
            response_type: "code",
            client_id: auth0_client_id, 
            //connection: "CONNECTION", 
            redirect_uri: "https://localhost:8080/amloggedin", 
            state: "KRETS_STATE"
        }); 

        const response = await get(`${auth0_domain}/authorize${query}`); 
        console.log(response);
    }

    const url = "https://krets.eu.auth0.com/login?client=si4eE1tnSMdh0pwD4Rt6ZKPgLoqioxzG&redirectu_uri=localhost:8080/"
    return h `<${Layout}>
        <button onClick=${onImplicit}>registrer implicit (not working)</button>
        <button onClick=${onUniversal}>universal login</button>
        <a href=${url}>Try link</a>
    </${Layout}>`
}


export default Register;