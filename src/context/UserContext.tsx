import { createContext, useState, useEffect } from "react";
import { get } from "node-kall";
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

            console.log(user);
            setUser(user);
        } else {

            setUser(null);
            console.warn("Could not fetch user data", status);
        }

    };

    useEffect(() => { updateUser(); }, []);


    return <UserContext.Provider value={{ user, updateUser }}>
        {props.children}
    </UserContext.Provider>
};