import * as React from "react";
import {createContext, useState} from "react";
import { get } from "../http/methods";

interface IUserContext {
    user: {
        sub: string,
        name: string
    },
    updateUser: (user: any) => void
}

export const UserContext = createContext<IUserContext>({
    user: null, updateUser: () => {}
});

export const UserContextProvider = props => {

    const [user, setUser] = useState(null);

    const updateUser = async () => {

        const [ status, user ] = await get('/api/auth/me');
        if (status === 200) {

            setUser(user);
        } else {

            setUser(null);
            console.warn("Could not fetch user data", status);
        }

    };

    React.useEffect(() => {updateUser();}, []);


    return <UserContext.Provider value={{user, updateUser}}>
        {props.children}
    </UserContext.Provider>
};