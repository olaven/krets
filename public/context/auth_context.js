import { h, createContext, useEffect, useState } from "../deps_frontend.js";

export const AuthContext = createContext({});

/**
 * Handles current authentication status 
 * of applicaxtion user. Available in all children 
 * of Layout.
 */
export const AuthContextProvider = props => {

    const [todo, setTodo] = useState("original todo thing");

    useEffect(() => {
        (async () => {

            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1"); 
            const todo = await response.json(); 
            setTodo(todo);
        })(); 
    }, []); 

    console.log("oppdaterte todo: ", todo)

    return h`<${AuthContext.Provider} value=${{todo}}> 
        ${props.children} 
    </${AuthContext.Provider}>` 
};