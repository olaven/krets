import * as React from "react";
import {createContext, useState} from "react";

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