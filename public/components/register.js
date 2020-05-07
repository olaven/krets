import Layout from "./layout.js";
import { h, useState, useEffect } from "../deps_frontend.js"



const Register = (props) => {

    const { auth0_client_id, auth0_domain, host_uri } = props; 
    const [ url, setUrl ] = useState("")


    useEffect(() => {

        const url = `https://krets.eu.auth0.com/login?client=${auth0_client_id}&redirect_uri=${host_uri}&response_type=token`;
        setUrl(url)
    }, [auth0_client_id, auth0_domain, host_uri])
    
    return h `<${Layout}>
        
        <a href=${url}>Login</a>
    </${Layout}>`
}


export default Register;