import { url, http } from "../utils/utils.js";
import { h, createContext, useEffect, useState } from "../deps_frontend.js";

export const AuthContext = createContext({});

/**
 * Effect -> Gets access token from 
 * appropriate location 
 */
const use_token = () => {

    const [ access_token, set_access_token ] = useState(null);

    useEffect(() => {

        const { access_token} = url.parse_hash(window.location);
        const storage = window.localStorage;

        if (access_token) {
            
            storage.setItem("access_token", access_token);
            set_access_token(access_token);
        } else {

            const from_storage = storage.getItem("access_token");
            set_access_token(from_storage);
        }
    }, []);

    useEffect(() => {

        if (access_token) {

            //TODO: validate (may have fetched old one from localstorage)
        }
    }, [ access_token ]);

    return access_token;
}

/**
 * Effect -> Gets user, if access 
 * @param {string} access_token  
 * @param {string} auth0_domain 
 */
const use_user = (access_token, auth0_domain) => {

    const [ user, set_user ] = useState(null);

    useEffect(async () => {

        if (access_token) {

            const response = await http.get(`${auth0_domain}/userinfo`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (response.status === 200) {

                const user = await response.json();
                set_user(user);
            } else {

                console.warn("Had token, but failed to fetch user", response);
            }

        } else {

            set_user(null);
        }
    }, [access_token])


    return user; 
}

/**
 * Handles current authentication status 
 * of applicaxtion user. Available in all children 
 * of Layout.
 */
export const AuthContextProvider = props => {

    if (!props.auth0) console.warn("authContext did not receive auth0 info");

    const { auth0_client_id, auth0_domain, host_uri } = props.auth0; 
    const login_uri = `${auth0_domain}/login?client=${auth0_client_id}&redirect_uri=${host_uri}&response_type=token`;
    
    const access_token = use_token();
    const user = use_user(access_token, auth0_domain);

    return h`<${AuthContext.Provider} value=${{user, login_uri}}> 
        ${props.children} 
    </${AuthContext.Provider}>` 
};