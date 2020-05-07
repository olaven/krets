import { url, http } from "../utils/utils.js";
import { h, createContext, useEffect, useState } from "../deps_frontend.js";

export const AuthContext = createContext({});

/**
 * Handles current authentication status 
 * of applicaxtion user. Available in all children 
 * of Layout.
 */
export const AuthContextProvider = props => {

    if (!props.auth0) console.warn("authContext did not receive auth0 info");

    const { auth0_client_id, auth0_domain, host_uri } = props.auth0; 
    const login_uri = `${auth0_domain}/login?client=${auth0_client_id}&redirect_uri=${host_uri}&response_type=token`;
    
    
    const { access_token } = url.parse_hash(window.location);


    const [ user, setUser ] = useState(null);

    useEffect(async () => {

        const response = await http.get(`${auth0_domain}/userinfo`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (response.status === 200) {
            
            const user = await response.json(); 
            setUser(user);
        }
    }, [ access_token ])


    return h`<${AuthContext.Provider} value=${{user, login_uri}}> 
        ${props.children} 
    </${AuthContext.Provider}>` 
};