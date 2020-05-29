import * as React from "react";
import {useEffect} from "react";

export const UserContext = React.createContext({});

export const AuthContext = props => {

    const [user, setUser] = React.useState(null);

    const updateUser = async () => {

        const res = await fetch('/api/auth/me');
        if (res.ok) {

            const user = await res.json();
            setUser(user);
        } else {

            setUser(null);
            console.error(res)
        }


    };

    React.useEffect(() => {updateUser();}, []);


    return <UserContext.Provider value={{user, updateUser}}>
        {props.children}
    </UserContext.Provider>
};