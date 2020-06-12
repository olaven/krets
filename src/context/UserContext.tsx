import * as React from "react";
import { createContext, useState } from "react";
import { get } from "../http/methods";
import { AuthModel } from "../models";

interface IUserContext {
    user: AuthModel,
    updateUser: (user: AuthModel) => void
}

export const UserContext = createContext<IUserContext>({
    user: null, updateUser: () => { }
});

export const UserContextProvider = props => {

    const [user, setUser] = useState<AuthModel | null>(null);

    const updateUser = async () => {

        const [status, user] = await get<AuthModel>('/api/auth/me');
        if (status === 200) {

            setUser(user);
        } else {

            setUser(null);
            console.warn("Could not fetch user data", status);
        }

    };

    React.useEffect(() => { updateUser(); }, []);


    return <UserContext.Provider value={{ user, updateUser }}>
        {props.children}
    </UserContext.Provider>
};