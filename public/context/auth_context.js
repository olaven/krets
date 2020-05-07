import { h, createContext, useEffect, useState } from "../deps_frontend.js";

export const AuthContext = createContext({});

/**
 * Handles current authentication status 
 * of applicaxtion user. Available in all children 
 * of Layout.
 */
export const AuthContextProvider = props => {

    /* console.log("props here: ", props)
    const { auth0_client_id, auth0_domain, host_uri } = props;
    const [url, setUrl] = useState(""); 
    // const [ token, setToken ] = useState(null); //needed? 
    const [ user, setUser ] = useState(null);

    useEffect(() => {

        const url = `https://krets.eu.auth0.com/login?client=${auth0_client_id}&redirect_uri=${host_uri}&response_type=token`;
        setUrl(url)
    }, [auth0_client_id, auth0_domain, host_uri]) */

    const [ user, setUser ] = useState(null);


    return h`<${AuthContext.Provider} value=${{user, setUser}}> 
        ${props.children} 
    </${AuthContext.Provider}>` 
};