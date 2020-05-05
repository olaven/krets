import Layout from "./layout.js";
import { h, useState, useEffect } from "../deps_frontend.js"
import { get } from "../utils.js";

const build_query = (config) => `?${Object.entries(config)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(`&`)}`;

const Register = (props) => {

    const { auth0_client_id, auth0_domain, host_uri } = props; 
    const [ url, setUrl ] = useState("")

    const fetch_user = async () => {

        const url = `https://krets.eu.auth0.com/userinfo`;

        //TODO: pass from server? 
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
        console.log(token);

        const response = await get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 

        console.log(response)
    }

    useEffect(() => {

        const url = `https://krets.eu.auth0.com/login?client=${auth0_client_id}&redirect_uri=${host_uri}&response_type=token`;
        setUrl(url)
    }, [auth0_client_id, auth0_domain, host_uri])
    
    return h `<${Layout}>
        
        <a href=${url}>Login</a>
        <button onClick=${fetch_user}>fetch user info</button>
    </${Layout}>`
}


export default Register;