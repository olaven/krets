import { h, createContext, useEffect, useState } from "../deps_frontend.js";

export const AuthContext = createContext({});

/**
 * Handles current authentication status 
 * of applicaxtion user. Available in all children 
 * of Layout.
 */
export const AuthContextProvider = props => {

    const [ user, setUser ] = useState(null);


    return h`<${AuthContext.Provider} value=${{user, setUser}}> 
        ${props.children} 
    </${AuthContext.Provider}>` 
};